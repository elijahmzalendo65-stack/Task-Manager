import { useEffect, useState } from "react";
import { Category, Priority, Task, TaskInput, TaskStatus } from "../../types/task";
import { X } from "lucide-react";
interface TaskFormProps {
    initialTask: Task | null;
    onSubmit: (data: TaskInput) => void;
    onClose: () => void;
}
const categories: Category[] = ["Work", "Personal", "Shopping", "Others"];

const priorities: Priority[] = ["Low", "Medium", "High"];

const statuses: TaskStatus[] = ["Pending", "In Progress", "Completed"];

export default function TaskForm({ initialTask, onSubmit, onClose }: TaskFormProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState<Category>("Work");
    const [priority, setPriority] = useState<Priority>("Low");
    const [dueDate, setDueDate] = useState("");
    const [status, setStatus] = useState<TaskStatus>("Pending");
    const [error, setError] = useState("");
    useEffect(() => {
        if (initialTask) {
            setTitle(initialTask.title);
            setDescription(initialTask.description);
            setCategory(initialTask.category);
            setPriority("Low");
            setDueDate(initialTask.dueDate);
            setStatus(initialTask.status);
        } else {
            setTitle("");
            setDescription("");
            setCategory("Work");
            setPriority("Low");
            setDueDate("");
            setStatus("Pending");
        }
        setError("");
    }, [initialTask]);
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!title.trim()) {
            setError("Title is required");
            return;
        }
        if (!dueDate) {
            setError("Please select a due date");
            return;
        }
        onSubmit({
            title: title.trim(),
            description: description.trim(),
            category,
            dueDate,
            status
        });
        onClose();
    }
    const inputClass =
        "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white";
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                        {initialTask ? "Edit Task" : "Create New Task"}
                    </h2>

                    <button type="button" onClick={onClose} aria-label="Close form">
                        <X />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Task Title *
                        </label>
                        <input
                            className={inputClass}
                            placeholder="Enter task title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            maxLength={100}
                            required
                        />
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Description
                        </label>
                        <textarea
                            className={inputClass}
                            placeholder="Describe your task..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Category
                            </label>
                            <select
                                className={inputClass}
                                value={category}
                                onChange={(e) => setCategory(e.target.value as Category)}
                            >
                                {categories.map((item) => (
                                    <option key={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Priority
                            </label>
                            <select
                                className={inputClass}
                                value={priority}
                                onChange={(e) => setPriority(e.target.value as Priority)}
                            >
                                {priorities.map((item) => (
                                    <option key={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Due Date *
                        </label>
                        <input
                            type="date"
                            className={inputClass}
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            required
                        />
                    </div>
                    {initialTask && (
                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Status
                            </label>
                            <select
                                className={inputClass}
                                value={status}
                                onChange={(e) => setStatus(e.target.value as TaskStatus)}
                            >
                                {statuses.map((item) => (
                                    <option key={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                    )}
                    {error && (
                        <p className="text-sm text-red-600">{error}</p>
                    )}

                    <div className="flex justify-end gap-3 pt-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl border px-5 py-3 text-sm"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
                        >
                            {initialTask ? "Save Changes" : "Create Task"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
