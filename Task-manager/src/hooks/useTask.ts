
import { useEffect, useState } from "react";
import type { Task, TaskInput } from "../types/task";
import { getTask, saveTask } from "../utils/storage";
export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(getTask);
  useEffect(() => {
    saveTask(tasks);
  }, [tasks]);
  function addTask(data: TaskInput) {
    const now = new Date().toISOString();
    const newTask: Task = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };
    setTasks((previous) => [newTask, ...previous]);
  }
  function updateTask(id: string, data: TaskInput) {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === id
          ? {
              ...task,
              ...data,
              updatedAt: new Date().toISOString(),
            }
          : task
      )
    );
  }
  function deleteTask(id: string) {
    setTasks((previous) =>
      previous.filter((task) => task.id !== id)
    );
  }
  function toggleTask(id: string) {
    setTasks((previous) =>
      previous.map((task) => {
        if (task.id !== id) return task;
        const status =
          task.status === "Completed"
            ? "Pending"
            : "Completed";
        return {
          ...task,
          status,
          updatedAt: new Date().toISOString(),
        };
      })
    );
  }
  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
  };
}
