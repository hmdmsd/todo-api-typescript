import { Request, Response } from "express";
import { db } from "../models/database";
import { TodoItem } from "../types";
import { generateId, checkIdExists } from "../utils";

export class ItemController {
  public static async getItems(req: Request, res: Response): Promise<void> {
    const listId = req.params.id;

    db.all(
      "SELECT * FROM items WHERE list_id = ?",
      [listId],
      (err: Error | null, rows: TodoItem[]) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json(rows);
      }
    );
  }

  public static async addItem(req: Request, res: Response): Promise<void> {
    try {
      const { description }: Partial<TodoItem> = req.body;
      const list_id = req.params.id;
      const status = "PENDING";

      if (!description) {
        res.status(400).json({ error: "Description is required" });
        return;
      }

      // Check if list exists
      const listExists = await checkIdExists(db, "lists", list_id);
      if (!listExists) {
        res.status(404).json({ error: "List not found" });
        return;
      }

      // Generate unique ID
      const id = generateId("item-");

      db.run(
        "INSERT INTO items (id, list_id, description, status) VALUES (?, ?, ?, ?)",
        [id, list_id, description, status],
        (err: Error | null) => {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
          res.status(201).json({ id, list_id, description, status });
        }
      );
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  public static async updateItem(req: Request, res: Response): Promise<void> {
    try {
      const { description, status }: Partial<TodoItem> = req.body;
      const { listId, itemId } = req.params;

      if (status && !["PENDING", "IN-PROGRESS", "DONE"].includes(status)) {
        res.status(400).json({ error: "Invalid status" });
        return;
      }

      // Check if item exists
      const itemExists = await checkIdExists(db, "items", itemId);
      if (!itemExists) {
        res.status(404).json({ error: "Item not found" });
        return;
      }

      db.run(
        "UPDATE items SET description = COALESCE(?, description), status = COALESCE(?, status) WHERE id = ? AND list_id = ?",
        [description, status, itemId, listId],
        (err: Error | null) => {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }

          // Fetch updated item
          db.get(
            "SELECT * FROM items WHERE id = ? AND list_id = ?",
            [itemId, listId],
            (err: Error | null, item: TodoItem) => {
              if (err) {
                res.status(500).json({ error: err.message });
                return;
              }
              if (!item) {
                res.status(404).json({ error: "Item not found" });
                return;
              }
              res.json(item);
            }
          );
        }
      );
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  public static async deleteItem(req: Request, res: Response): Promise<void> {
    try {
      const { listId, itemId } = req.params;

      // Check if item exists
      const itemExists = await checkIdExists(db, "items", itemId);
      if (!itemExists) {
        res.status(404).json({ error: "Item not found" });
        return;
      }

      db.run(
        "DELETE FROM items WHERE id = ? AND list_id = ?",
        [itemId, listId],
        (err: Error | null) => {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
          res.json({ message: "Item deleted successfully" });
        }
      );
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
