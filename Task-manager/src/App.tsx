import {useMemo, useState} from  "react"

import{
    CheckCircle2,
    Clock,
    ListTodo,
    AlertCircle,
    Plus,
} from "lucide-react"
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import StatCard from "./components/dashboard/StatCard";
import TaskForm from "./components/taks/TaskForm";
import TaskCard from "./components/taks/TaskCard";
import TaskList from "./components/taks/TaskList";
import { useTasks } from "./hooks/useTask";
import type { TaskFilter } from "./components/taks/TaskFilters";
import type { Priority, Task, TaskInput } from "./types/task";
import TaskFilters from "./components/taks/TaskFilters";
function getLocalDate(){
    const date = new Date();
    const offset = date.getTimezoneOffset();
    return new Date(date.getTime() - offset * 60000)
    .toISOString()
    .slice(0,10);
}
export default function App(){
    const{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        toggleTask,

    } = useTasks();
    const [activePage, setActivePage] = useState("Dashboard");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [search, setsearch] = useState("");
    const [filter, setfilter] = useState<TaskFilter>("All");
    const [priority, setPriority] = useState<Priority | "All">("All");
    const [darkMode, SetDarkMode] = useState(
        () => localStorage.getItem("taskflow_them") === "dark"
    );

    const today = getLocalDate();

    const statistics = useMemo(() => {
        const completed = tasks.filter(
            (task) => task.status === "Completed"
        ).length;
        const pending = tasks.filter(
            (task) => task.status !== "Pending"
        ).length;
        const inProgress = tasks.filter(
            (task) => task.status === "In Progress"
        ).length;
        const overdue =  tasks.filter(
            (task) => task.status === "Completed"
        ).length;
        return {
          total: tasks.length,
            completed,
            pending,
            inProgress,
            overdue,
            percentage: tasks.length ? Math.round((completed / tasks.length) * 100) : 0,
        };
    }, [tasks, today]);
     const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase().trim());
      const matchesPriority =
        priority === "All" ||
        ("priority" in task && task.priority === priority);
      const matchesFilter =
        filter === "All" ||
        (filter === "Overdue" &&
          task.status !== "Completed" &&
          task.dueDate < today) ||
        (filter === "HighPriority" &&
          "priority" in task && task.priority === "High") ||
        task.status === filter;
      const matchesPage =
        activePage === "Completed"
          ? task.status === "Completed"
          : true;
      return (
        matchesSearch &&
        matchesPriority &&
        matchesFilter &&
        matchesPage
      );
    });
  }, [
    tasks,
    search,
    filter,
    priority,
    activePage,
    today,
  ]);
  function handleSubmit(data: TaskInput) {
    if (editingTask){
        updateTask(editingTask.id, data);
    } else {
        addTask(data);
        setEditingTask(null);
    }
  }
  function handleEdit(task: Task) {
    setEditingTask(task);
    setShowForm(true);
  }
  function handleCreate() {
    setEditingTask(null);
    setShowForm(true);
  }
  function closeForm(){
    setShowForm(false);
    setEditingTask(null);
  }
  function toggleDarkMode() {
    SetDarkMode((prevoius) => {
        const next = !prevoius;
        localStorage.set.item(
            "taskflow_theme", next ? "dark" : "light"
        );

        return next;
    });
  }
  const pageTitle = activePage === "Dashboard" ? "Dashboard" : activePage;
  return (
    <div className={darkMode ? "dark" : ""}>
        <div className="mib-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
            <Sidebar activePage={activePage} setActivePage={setActivePage} open={sidebarOpen} setOpen={setSidebarOpen} />

            <main className="min-h-screen px-4 pb-10 pt-4 md:ml-64 md:px-8 md:pt-8">
                <Header title={pageTitle} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
                {activePage === "Settings" ? (
                    <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border--slate-800 dark:big-slate-900">
                      <h3 className="text-lgfont-semibold">
                        Application Settings
                      </h3>
                      <p className="mt-2 text-sm text-slate-500">
                        Manage your TaskFlow display preferences.
                      </p>
                      <button onClick={toggleDarkMode} className="mt-5 rounded-xl bg indigo-600 px-5 py-3 text-sm font-semibold text-white">
                        Switch to 
                        {darkMode ? "Light" : "Dark"} Mode
                      </button>
                    </section>
                ) : (
                  <>
                  {activePage === "Dashboard" && (
                    <>
                    <section className="mb-8"> 
                      <h2 className="text-xl font-bold">
                        Welcome back!
                      </h2>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Here's an overview of your productivity.
                      </p>
                    </section>
                    <section className="mb-8 grid drid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                      <StatCard title="Total Tasks" value={statistics.total} icon={ListTodo} color="bg-indigo-100 text-indigo-600" />
                      <StatCard title="Pending" value={statistics.pending} icon={Clock} color="bg-orange-100 text-orange-600" />
                      <StatCard title="Completed" value={statistics.completed} icon={CheckCircle2} color="bg-green-100 text-green-600" />
                      <StatCard title="Overdue" value={statistics.overdue} icon={AlertCircle} color="bg-red-100 text-red-600" />
                    </section>
                    <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:big-slate-900">
                      <div className="mb-3 flex justify-between">
                        <h3 className="font-semibold">
                            Overall Progress.
                        </h3>
                        <span className="font-bold text-indigo-600">
                          {statistics.percentage}% 
                        </span>
                      </div>
                      <div className="h-3 overflow-hidden rounded-full bg-indigo-600 transition-all" style={{
                        width: '${statistics.percentage}%'
                      }} >
                      </div>
                      <p className="mt-3 text-xs text-slate-500">
                        {statistics.completed} of {statistics.total} tasks completed
                      </p>
                    </section>
                    </>
                  )}
                  </>
                )}
                <section>
                  <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold">
                        {activePage === "Dashboard" ? "Recent Tasks" : activePage === "Completed" ? "Completed Tasks" : "All Tasks"} 
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        Manage your daily activities.
                      </p>
                    </div>
                    <button onClick={handleCreate} className="flex items-center gap-2 rounded-xl bg:indigo-600 px-4 py-3 text-sm font-semibold text:white transition hover:bg-indigo-700">
                      <Plus size={18} />
                      Add Task
                    </button>
                  </div>
                  <div className="mb-6">
                    <TaskFilters
                      search={search}
                      setSearch={setsearch}
                      filter={filter}
                      setFilter={setfilter}
                      priority={priority}
                      setPriority={setPriority}
                    />
                  </div>
                  <TaskList
                    tasks={activePage === "Dashboard" ? filteredTasks.slice(0, 5) : filteredTasks}
                    onEdit={handleEdit}
                    onDelete={deleteTask}
                    onToggle={toggleTask}
                  />
                </section>
            </main>
        </div>
    </div>
  );
}

