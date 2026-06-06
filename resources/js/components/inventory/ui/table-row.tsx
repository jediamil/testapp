export default function TableRow({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <tr className="border-b border-gray-50 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-800/30">
            {children}
        </tr>
    )
}