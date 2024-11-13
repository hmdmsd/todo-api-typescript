// src/utils/index.ts
export const generateId = (prefix: string = ""): string => {
  return `${prefix}${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Function to check if ID exists
export const checkIdExists = (
  db: any,
  table: string,
  id: string
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT id FROM ${table} WHERE id = ?`,
      [id],
      (err: Error | null, row: any) => {
        if (err) reject(err);
        resolve(!!row);
      }
    );
  });
};
