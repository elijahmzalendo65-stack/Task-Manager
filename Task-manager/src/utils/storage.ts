import type { Task } from '../types/task';

const STORAGE_KEY = 'taskflow_tasks';

export function getTask(): Task[] {
    try{
        const storedTasks = localStorage.getItem(STORAGE_KEY);
        if (!storedTasks) return [];

        const parsed: unknown = JSON.parse(storedTasks);
        return Array.isArray(parsed) ? parsed as Task[] : [];
    }
     catch{
        return [];
     }
}
export function saveTask(tasks: Task[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}
