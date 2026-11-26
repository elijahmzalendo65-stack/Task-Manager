import { Search } from "lucide-react";
import type { TaskStatus, Priority } from "../../types/task";

export type TaskFilter =
| "All"
| TaskStatus
| "HighPriority"
| "Overdue"


interface TaskFiltersProps {
    search: string;
    setSearch: (value: string) =>void;
    filter: TaskFilter;
    setFilter: (value: TaskFilter) => void;
    priority: Priority | "All";
    setPriority: (value: Priority | "All") => void
}
const filters: TaskFilter[] = [
    "All",
    "Pending",
    "In Progress",
    "Completed",
    "HighPriority",
    "Overdue"
]
export default function TaskFilters({
    search,
    setSearch,
    filter,
    setFilter,
    priority,
    setPriority,
}: TaskFiltersProps) {
    return(
        <div className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                    <Search size={19} className="absolute left-3 top-3.5 text-slate-400"/>
                    <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search tasks..." className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"/>
                </div>

                <select value={priority} onChange={(e) => setPriority(e.target.value as Priority | "All")} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white">
                    <option value="All">
                        All Priorities
                    </option>
                    <option value="High">
                        High Priorities
                    </option>
                    <option value="Medium">
                        Medium Priorities
                    </option>
                    <option value="Low">
                        Low Priorities
                    </option>
                </select>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
                {filters.map((item) => (
                    <button
                        key={item}
                        onClick={() => setFilter(item)}
                        className={`shrink-0 rounded-xl px-4 py-2 text-sm font-medium transition ${
                            filter === item
                                ? "bg-indigo-600 text-white"
                                : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-300"
                        }`}
                    >
                        {item}
                    </button>
                ))}
            </div>
        </div>
    )
}
