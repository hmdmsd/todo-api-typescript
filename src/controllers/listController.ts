import { Request, Response } from "express";
import { db } from "../models/database";
import { TodoList, TodoItem } from "../types";

export class ListController {
  public static async getLists(req: Request, res: Response): Promise<void> {
    db.all("SELECT * FROM lists", (err: Error | null, rows: TodoList[]) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows);
    });
  }

  public static async createList(req: Request, res: Response): Promise<void> {
    const { id, name, description }: TodoList = req.body;

    db.run(
      "INSERT INTO lists (id, name, description) VALUES (?, ?, ?)",
      [id, name, description],
      (err: Error | null) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.status(201).json({ id, name, description });
      }
    );
  }

  public static async updateList(req: Request, res: Response): Promise<void> {
    const { name, description }: Partial<TodoList> = req.body;
    const { id } = req.params;

    db.run(
      "UPDATE lists SET name = ?, description = ? WHERE id = ?",
      [name, description, id],
      (err: Error | null) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json({ id, name, description });
      }
    );
  }
}
