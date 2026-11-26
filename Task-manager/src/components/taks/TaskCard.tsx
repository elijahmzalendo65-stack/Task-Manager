import { CalendarDays, Check, Pencil, Trash2 } from "lucide-react"

import type { Task } from "../../types/task"

interface TaskCardProps {
    task: Task
    onEdit: (task: Task) => void
    onDelete: (id: string) => void
    onToggle: (id: string) => void
}

export default function TaskCard({
    task,
    onEdit,
    onDelete,
    onToggle,
}: TaskCardProps) {
    type TaskPriority = "Low" | "Medium" | "High"

    const priorityColors: Record<TaskPriority, string> = {
        Low: "bg-green-100 text-green-700",
        Medium: "bg-amber-100 text-amber-700",
        High: "bg-red-100 text-red-700",
    }
    const priority = (task as Task & { priority?: TaskPriority }).priority ?? "Low"
    const overdue = task.status !== "Completed" && task.dueDate < new Date().toLocaleDateString("en-CA")
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:bg-slate-900">
            <div className="flex items-start gap-4">
                <button
                    onClick={() => onToggle(task.id)}
                    aria-label="Toggle task completion"
                    className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                        task.status === "Completed"
                            ? "border-green-600 bg-green-600 text-white"
                            : "border-slate-300"
                    }`}
                >
                    {task.status === "Completed" && <Check size={15} />}
                </button>
                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                        <h3 className={`font-semibold ${
                            task.status === "Completed"
                            ? "text-slate-400 line-through"
                            : "text-slate-900 dark:text-white"}`}
                        >
                            {task.title}
                        </h3>
                        <span className={`rounded-full px-2 py-1 text-xs font-semibold ${priorityColors[priority]}`}>
                            {priority}
                        </span>
                    </div>
                    {task.description && (
                        <p className="mt-2 break-words text-sm text-slate-500 dark:text-slate-400">
                            {task.description}
                        </p>
                    )}
                    <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                        <span>{task.category}</span>

                        <span className="flex items-center gap-1">
                            <CalendarDays size={14} />
                            {task.dueDate}
                        </span>

                        <span className={overdue ? "font-semibold text-red-600" : ""}>
                            {overdue ? "Overdue" : task.status}
                        </span>
                    </div>
                </div>
                <div className="flex gap-1">
                    <button
                        onClick={() => onEdit(task)}
                        aria-label="Edit task"
                        className="rounded-lg p-2 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600"
                    >
                        <Pencil size={17} />
                    </button>
                    <button
                        onClick={() => {
                            if (window.confirm("Delete this task?")) {
                                onDelete(task.id)
                            }
                        }}
                        aria-label="Delete task"
                        className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                    >
                        <Trash2 size={17} />
                    </button>
                </div>
            </div>
        </div>
    )
}