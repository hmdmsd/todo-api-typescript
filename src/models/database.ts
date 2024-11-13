import sqlite3 from "sqlite3";
import { Database } from "sqlite3";

class DatabaseConnection {
  private db: Database;

  constructor() {
    this.db = new sqlite3.Database("todo.db");
    this.initializeDatabase();
  }

  private initializeDatabase(): void {
    this.db.serialize(() => {
      this.db.run(`CREATE TABLE IF NOT EXISTS lists (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT
      )`);

      this.db.run(`CREATE TABLE IF NOT EXISTS items (
        id TEXT PRIMARY KEY,
        list_id TEXT NOT NULL,
        description TEXT NOT NULL,
        status TEXT CHECK(status IN ('PENDING', 'IN-PROGRESS', 'DONE')) NOT NULL,
        FOREIGN KEY(list_id) REFERENCES lists(id)
      )`);
    });
  }

  public get database(): Database {
    return this.db;
  }
}

export const db = new DatabaseConnection().database;
