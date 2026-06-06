import TableRow from "./ui/table-row";
import TableHead from "./ui/table-head"
import type { Product } from "@/types/product";
import { router } from '@inertiajs/react';
import { destroy } from "@/routes/inventory";

interface Props {
    filteredProducts: Product[];
}

export default function ProductTableForDesktop({filteredProducts}: Props) {

    const handleDelete = (product: Product) => {
        if (!confirm(`Delete ${product.name}?`)) {
            return;
        }

        router.delete(destroy(product.id).url);
    };
    return (
        <>
            <div className="hidden lg:block">
                <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/50 shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <TableRow>
                                    <TableHead tableName="SKU" />
                                    <TableHead tableName="Product" />
                                    <TableHead tableName="Unit" />
                                    <TableHead tableName="Price" />
                                    <TableHead tableName="Stock" />
                                    <TableHead tableName="Min stock" />
                                    <TableHead tableName="Status" />
                                    <TableHead tableName="Action" />
                                </TableRow>
                            </thead>
                            <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                                {filteredProducts.map((product, index) => (
                                    <tr
                                        key={product.id}
                                        className="group transition-colors hover:bg-gray-50/40 dark:hover:bg-gray-800/40 cursor-default"
                                    >
                                        <td className="px-4 sm:px-6 py-4 text-sm">
                                            <code className="text-[13px] font-mono text-gray-500 dark:text-gray-400">
                                                {product.sku}
                                            </code>
                                        </td>
                                        <td className="px-4 sm:px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-lg bg-linear-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-800/50 flex items-center justify-center">
                                                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                                        {product.name.charAt(0)}
                                                    </span>
                                                </div>
                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                                    {product.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 sm:px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                            {product.unit}
                                        </td>
                                        <td className="px-4 sm:px-6 py-4">
                                            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                                ₱{Number(product.price).toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="px-4 sm:px-6 py-4">
                                            <span className={`text-sm font-medium ${
                                                product.stocks <= product.min_stock 
                                                    ? 'text-amber-600 dark:text-amber-400' 
                                                    : 'text-gray-700 dark:text-gray-300'
                                            }`}>
                                                {product.stocks.toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="px-4 sm:px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                            {product.min_stock}
                                        </td>
                                        <td className="px-4 sm:px-6 py-4">
                                            {product.stocks <= product.min_stock ? (
                                                <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 dark:bg-amber-950/30 px-2.5 py-1">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-amber-500 dark:bg-amber-400"></div>
                                                    <span className="text-xs font-medium text-amber-700 dark:text-amber-400">
                                                        Low Stock
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-1">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400"></div>
                                                    <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                                                        In Stock
                                                    </span>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-4 sm:px-6 py-3 sm:py-4">
                                            <div className="flex items-center gap-2">
                                                {/* Edit Button */}
                                                <button
                                                    // onClick={() => handleEdit(product)}
                                                    className="inline-flex items-center gap-1 rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200 transition-colors"
                                                    title="Edit product"
                                                >
                                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                    </svg>
                                                </button>

                                                {/* Delete Button */}
                                                <button
                                                    onClick={() => handleDelete(product)}
                                                    className="inline-flex items-center gap-1 rounded-lg p-1.5 text-red-500 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/30 dark:hover:text-red-300 transition-colors"
                                                    title="Delete product"
                                                >
                                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="flex flex-col items-center justify-center gap-3 px-4 py-16 text-center">
                            <div className="rounded-full bg-gray-50 dark:bg-gray-800/50 p-4">
                                <svg className="h-8 w-8 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">No products found</p>
                                <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">Try adjusting your search or add a new product</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}