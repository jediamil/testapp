import PaginationButton from "@/components/inventory/pagination-button";
import { ActivityLogCollection } from "@/types/activity-logs"

type LogsProps = {
    logs: ActivityLogCollection;
}


export default function ActiviyLogs({logs}: LogsProps) {
    
console.log(logs);
    return (
        <div className="p-3 sm:p-4 md:p-6 lg:p-8">
        <div className="mb-4 sm:mb-6 md:mb-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-medium sm:font-bold text-gray-900 dark:text-gray-100 tracking-tight">
            Activity Logs
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 mt-0.5 sm:mt-1">
            Monitor and record every user activity and system interaction.
            </p>
        </div>

        {/* Mobile card view */}
        <div className="block sm:hidden space-y-3">
        {logs.data.map((log) => (
            <div 
            key={log.id}
            className="bg-white dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden"
            >
            <div className="px-4 py-3">
                <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                    <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
                    {new Date(log.date).toLocaleString("en-PH", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                    })}
                    </span>
                </div>
                <span className="text-xs font-medium px-2.5 py-1 bg-gray-50 dark:bg-gray-800/50 rounded-md text-gray-600 dark:text-gray-300">
                    {log.user ?? 'System User'}
                </span>
                </div>
                <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                    <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider min-w-13">
                    Action
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {log.action}
                    </span>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider min-w-13">
                    Item
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400 war-break-words flex-1">
                    {log.item}
                    </span>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider min-w-13">
                    SKU
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400 war-break-words flex-1">
                    {log.sku}
                    </span>
                </div>
                </div>
            </div>
            <div className="h-0.5 bg-linear-to-r from-gray-50 via-gray-100 to-gray-50 dark:from-gray-800/20 dark:via-gray-800/40 dark:to-gray-800/20"></div>
            </div>
        ))}
        </div>

        {/* Desktop table view */}
        <div className="overflow-x-auto hidden sm:block relative rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/50 shadow-sm">
            <div className="overflow-x-auto">
                <div className="min-w-160">
                    <table className="w-full text-[13px]">
                        <thead>
                            <tr className="border-b border-gray-100 dark:border-gray-800/60 dark:bg-gray-900">
                                <th className="px-4 md:px-6 py-3 text-left font-normal text-gray-800 dark:text-gray-500 tracking-wide">
                                    Date
                                </th>
                                <th className="px-4 md:px-6 py-3 text-left font-normal text-gray-800 dark:text-gray-500 tracking-wide">
                                    Actor
                                </th>
                                <th className="px-4 md:px-6 py-3 text-left font-normal text-gray-800 dark:text-gray-500 tracking-wide">
                                    Action
                                </th>
                                <th className="px-4 md:px-6 py-3 text-left font-normal text-gray-800 dark:text-gray-500 tracking-wide">
                                    Item
                                </th>
                                <th className="px-4 md:px-6 py-3 text-left font-normal text-gray-800 dark:text-gray-500 tracking-wide">
                                    SKU
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-gray-800/40">
                            {logs.data.map((log) => (
                            <tr
                                key={log.id}
                                className="group transition-all duration-150 hover:bg-gray-50/40 dark:hover:bg-gray-800/30 cursor-default"
                            >
                                <td className="px-4 md:px-6 py-3 font-mono text-gray-500 dark:text-gray-400 tabular-nums whitespace-nowrap">
                                {new Date(log.date).toLocaleString("en-PH", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "2-digit",
                                })}
                                </td>
                                <td className="px-4 md:px-6 py-3 font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                {log.user ?? 'System User'}
                                </td>
                                <td className="px-4 md:px-6 py-3 text-gray-600 dark:text-gray-300">
                                {log.action}
                                </td>
                                <td className="px-4 md:px-6 py-3 text-gray-500 dark:text-gray-400">
                                {log.item}
                                </td>
                                <td className="px-4 md:px-6 py-3 text-gray-500 dark:text-gray-400">
                                {log.sku}
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
         {/* Pagination */}
                <PaginationButton
                    current_page={logs.meta.current_page}
                    last_page={logs.meta.last_page}
                    path={logs.meta.path}
                    prev_page_url={logs.links.prev}
                    next_page_url={logs.links.next}
                />
        </div>
    )
}