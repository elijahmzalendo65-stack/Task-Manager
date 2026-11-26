import { ListTodo } from "lucide-react";
import type { Task } from "../../types/task"
import TaskCard from "./TaskCard";
interface TaskListProps {
    tasks: Task[];
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
    onToggle: (id: string) => void;
}
export default function TaskList({
    tasks,
    onEdit,
    onDelete,
    onToggle,
}: TaskListProps) {
    if (tasks.length === 0) {
        return(
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center dark:border-slate-700 dark:big-slate-900">
            <ListTodo size={42} className="mx-auto text-slate-400"/>
            <h3 className="mt-4 font-semibold text-slate-800 dark:text-white">
                No tasks found
            </h3>
            <p className="mt-2 text-sm text-slate-500">
                Create a task or change your search filters.
            </p>
        </div>
        );
    }
    return (
        <div className="sapce-y-3">
            {tasks.map((task) => (
                <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onToggle={onToggle}
                />
            ))}
        </div>
    );
}
