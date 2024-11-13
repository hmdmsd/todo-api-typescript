// src/scripts/mockData.ts
import { db } from "../models/database";

const mockLists = [
  {
    id: "1",
    name: "Shopping List",
    description: "Groceries and household items",
  },
  {
    id: "2",
    name: "Work Tasks",
    description: "Important work-related tasks",
  },
  {
    id: "3",
    name: "Personal Goals",
    description: "Personal development goals for 2024",
  },
];

const mockItems = [
  {
    id: "item1",
    list_id: "1",
    description: "Buy milk",
    status: "PENDING",
  },
  {
    id: "item2",
    list_id: "1",
    description: "Get bread",
    status: "DONE",
  },
  {
    id: "item3",
    list_id: "1",
    description: "Purchase vegetables",
    status: "IN-PROGRESS",
  },
  {
    id: "item4",
    list_id: "2",
    description: "Complete project proposal",
    status: "IN-PROGRESS",
  },
  {
    id: "item5",
    list_id: "2",
    description: "Review code changes",
    status: "PENDING",
  },
  {
    id: "item6",
    list_id: "3",
    description: "Learn TypeScript",
    status: "IN-PROGRESS",
  },
];

async function seedDatabase() {
  try {
    // Clear existing data
    await new Promise<void>((resolve, reject) => {
      db.run("DELETE FROM items", (err) => {
        if (err) reject(err);
        resolve();
      });
    });

    await new Promise<void>((resolve, reject) => {
      db.run("DELETE FROM lists", (err) => {
        if (err) reject(err);
        resolve();
      });
    });

    // Insert mock lists
    for (const list of mockLists) {
      await new Promise<void>((resolve, reject) => {
        db.run(
          "INSERT INTO lists (id, name, description) VALUES (?, ?, ?)",
          [list.id, list.name, list.description],
          (err) => {
            if (err) reject(err);
            resolve();
          }
        );
      });
    }

    // Insert mock items
    for (const item of mockItems) {
      await new Promise<void>((resolve, reject) => {
        db.run(
          "INSERT INTO items (id, list_id, description, status) VALUES (?, ?, ?, ?)",
          [item.id, item.list_id, item.description, item.status],
          (err) => {
            if (err) reject(err);
            resolve();
          }
        );
      });
    }

    console.log("Database seeded successfully!");
    console.log(
      `Inserted ${mockLists.length} lists and ${mockItems.length} items.`
    );

    // Display the inserted data
    db.all("SELECT * FROM lists", (err, lists) => {
      if (err) throw err;
      console.log("\nLists:", lists);
    });

    db.all("SELECT * FROM items", (err, items) => {
      if (err) throw err;
      console.log("\nItems:", items);
    });
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

// Run the seeding function
seedDatabase().then(() => {
  console.log("Seeding complete!");
});
