import { useAppDispatch, useAppSelector } from "../store/useStoreHooks";
import {
  addTask,
  deleteTask,
  toggleTaskCompletion,
  setFilter,
  reorderTasks,
} from "../store/taskSlice";
import type { FilterStatus, Task } from "../types";

export const useTasks = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const filter = useAppSelector((state) => state.tasks.filter);
  const loading = useAppSelector((state) => state.tasks.loading);
  const error = useAppSelector((state) => state.tasks.error);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return {
    tasks: sortedTasks,
    allTasks: tasks,
    filter,
    loading,
    error,
    addTask: (task: Task) => dispatch(addTask(task)),
    deleteTask: (id: string) => dispatch(deleteTask(id)),
    toggleTaskCompletion: (id: string) => dispatch(toggleTaskCompletion(id)),
    setFilter: (status: FilterStatus) => dispatch(setFilter(status)),
    reorderTasks: (newTasks: Task[]) => dispatch(reorderTasks(newTasks)),
  };
};
