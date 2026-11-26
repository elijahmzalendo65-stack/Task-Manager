import {
  LayoutDashboard,
  CheckSquare,
  ListTodo,
  Settings,
  X,
  Menu,
} from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
interface SidebarProps {
  activePage: string;
  setActivePage: Dispatch<SetStateAction<string>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
export default function Sidebar({
  activePage,
  setActivePage,
  open,
  setOpen,
}: SidebarProps) {
  const navigation = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "All Tasks", icon: ListTodo },
    { name: "Completed", icon: CheckSquare },
    { name: "Settings", icon: Settings },
  ];
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-30 rounded-lg bg-white p-2 shadow-md md:hidden"
        aria-label="Open navigation"
      >
        <Menu size={22} />
      </button>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-slate-200 bg-white p-5 transition-transform duration-300 dark:border-slate-800 dark:bg-slate-900 md:static md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="mb-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="rounded-xl bg-indigo-600 p-2 text-white">
                    <CheckSquare size={22} />
                </div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                    TaskFlow
                    </h1>
                  </div>
                  <button onClick={() => setOpen(false)} className="md:hidden" aria-label="Close navigation">
                    <X />
                    </button>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        WorkSpace
                    </p>
                    <nav className="space-y-2">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            const active = activePage === item.name;
                            return (
                                <button
                                    key={item.name}
                                    onClick={() => {
                                        setActivePage(item.name);
                                        setOpen(false);
                                    }}
                                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                                        active
                                            ? "bg-indigo-600 text-white"
                                            : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                                    }`}
                                >
                                    <Icon size={19} />
                                    {item.name}
                                </button>
                            );
                        })}
                    </nav>
                    <div className="absolute bottom-6 left-5 right-5 rounded-xl bg-indigo-50 p-4 dark:bg-slate-800">
                        Stay productive!
                        <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                            Organize your day, one task at a time.
                        </p>
                    </div>
        </div>
      </aside>
    </>
  );
}

