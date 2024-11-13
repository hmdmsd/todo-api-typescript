export interface TodoList {
  id: string;
  name: string;
  description?: string;
}

export interface TodoItem {
  id: string;
  list_id: string;
  description: string;
  status: "PENDING" | "IN-PROGRESS" | "DONE";
}
