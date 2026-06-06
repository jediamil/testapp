type TableHeadProps = {
    tableName: string;
}

export default function TableHead({
    tableName,
}: TableHeadProps) {
    return (
        <th className="px-4 sm:px-6 py-4 text-left text-[11px] font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
            {tableName}
        </th>
    )
}