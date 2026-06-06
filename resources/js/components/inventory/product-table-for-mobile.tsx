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
            <div className="block lg:hidden space-y-3">
                {filteredProducts.map((product) => (
                    <div 
                        key={product.id} 
                        className="group rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-4 shadow-sm transition-all hover:shadow-md active:scale-[0.98]"
                    >
                        {/* Header Section */}
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3 flex-1">
                                <div className="h-10 w-10 rounded-xl bg-linear-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-800/50 flex items-center justify-center shrink-0">
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        {product.name.charAt(0)}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                                        {product.name}
                                    </h3>
                                    <code className="text-xs font-mono text-gray-400 dark:text-gray-500">
                                        {product.sku}
                                    </code>
                                </div>
                            </div>
                            
                            {/* Status Badge */}
                            {product.stocks <= product.min_stock ? (
                                <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 dark:bg-amber-950/30 px-2.5 py-1 shrink-0 ml-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-amber-500 dark:bg-amber-400"></div>
                                    <span className="text-xs font-medium text-amber-700 dark:text-amber-400">
                                        Low Stock
                                    </span>
                                </div>
                            ) : (
                                <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-1 shrink-0 ml-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400"></div>
                                    <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                                        In Stock
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-50 dark:border-gray-800">
                            <div>
                                <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                                    Unit
                                </p>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    {product.unit}
                                </p>
                            </div>
                            
                            <div>
                                <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                                    Price
                                </p>
                                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                    ₱{Number(product.price).toLocaleString()}
                                </p>
                            </div>
                            
                            <div>
                                <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                                    Stock
                                </p>
                                <p className={`text-sm font-medium ${
                                    product.stocks <= product.min_stock 
                                        ? 'text-amber-600 dark:text-amber-400' 
                                        : 'text-gray-700 dark:text-gray-300'
                                }`}>
                                    {product.stocks.toLocaleString()}
                                </p>
                            </div>
                            
                            <div>
                                <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                                    Min Stock
                                </p>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    {product.min_stock}
                                </p>
                            </div>
                        </div>

                        {/* Optional: Quick Actions (can be added later) */}
                        <div className="flex gap-2 mt-3 pt-3 border-t border-gray-50 dark:border-gray-800">
                            <button className="flex-1 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors py-1">
                                Edit
                            </button>
                            <button onClick={() => handleDelete(product)} className="flex-1 text-xs text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors py-1">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}

                {/* Empty State for Mobile */}
                {filteredProducts.length === 0 && (
                    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/50 px-6 py-16 text-center">
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
        </>
    )
}