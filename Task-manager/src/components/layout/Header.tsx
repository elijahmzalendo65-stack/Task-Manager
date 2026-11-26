import { Moon, Sun } from "lucide-react";
interface Headerprops {
    title: string;
    darkMode: boolean;
    toggleDarkMode: () => void;
}
export default function Header({ title, darkMode, toggleDarkMode }: Headerprops) {
    return (
        <header className="mb-8 flex items-center justify-between gap-4 pt-12 md:pt-0">
            <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Workspace / {title}
                </p>
                <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                    {title}
                </h2>
            </div>
            <button onClick={toggleDarkMode} aria-label="Toggle dark mode" className="rounded-xl border border-slate-200 bg-white p-3 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white">
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
        </header>
    )
}