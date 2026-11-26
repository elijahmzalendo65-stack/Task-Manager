export type Priority = "Low" | "Medium" | "High";

export type Category = "Work" | "Personal" | "Shopping" | "Others";

export type TaskStatus = "Pending" | "In Progress" | "Completed";

export interface Task {
  id: string;
  title: string;
  description: string;
  category: Category;
  dueDate: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}
export type TaskInput = Omit<Task, "id" | "createdAt" | "updatedAt">;