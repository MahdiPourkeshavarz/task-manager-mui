export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  priority: "low" | "medium" | "high";
}

export type FilterStatus = "all" | "completed" | "pending";

export interface TaskState {
  tasks: Task[];
  filter: FilterStatus;
  loading: boolean;
  error: string | null;
}
