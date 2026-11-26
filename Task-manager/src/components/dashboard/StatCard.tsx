import { LucideIcon } from "lucide-react";
interface StatCardProps {
    title: string;
    value: number;
    icon: LucideIcon;
    color: string;    
}
export default function StatCard({
    title,
    value,
    icon: Icon,
    color,
}: StatCardProps) {
    return(
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    {title}
                </p>

                <div className={'rounded-xl p-3 ${color}'}>
                    <Icon size={21}/>
                </div>
            </div>
            <h3 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">
                {value}
            </h3>
        </div>
    )
}