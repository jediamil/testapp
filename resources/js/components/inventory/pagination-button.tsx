import { Link } from "@inertiajs/react"
import { useState } from "react";
import type { ProductPagination } from "@/types/product";

interface Props {
    products: ProductPagination;
}

export default function PaginationButton({ products }: Props) {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => {
        setIsLoading(true);
        // Reset loading after navigation (component will unmount/render anyway)
        setTimeout(() => setIsLoading(false), 500);
    };

    // Generate page numbers to show
    const getPageNumbers = (): (number | string)[] => {
        const delta = 2;
        const range: number[] = [];
        const rangeWithDots: (number | string)[] = [];
        let l: number | undefined;

        for (let i = 1; i <= products.last_page; i++) {
            if (i === 1 || i === products.last_page || (i >= products.current_page - delta && i <= products.current_page + delta)) {
                range.push(i);
            }
        }

        range.forEach((i) => {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push('...');
                }
            }
            rangeWithDots.push(i);
            l = i;
        });

        return rangeWithDots;
    };

    return (
        <div className="flex flex-col gap-4 mt-6">
            {/* Mobile Layout - Stacked */}
            <div className="flex flex-col sm:hidden gap-3">
                {/* Page Indicator */}
                <div className="flex items-center justify-center gap-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        Page <span className="font-medium text-gray-900 dark:text-gray-100">{products.current_page}</span>
                    </span>
                    <span className="text-gray-400 dark:text-gray-600">of</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{products.last_page}</span>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between gap-3">
                    <Link
                        href={products.prev_page_url ?? '#'}
                        onClick={handleClick}
                        className={`flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                            !products.prev_page_url 
                                ? "pointer-events-none opacity-40 cursor-not-allowed"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 dark:active:bg-gray-700"
                        } ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Previous
                    </Link>

                    <Link
                        href={products.next_page_url ?? '#'}
                        onClick={handleClick}
                        className={`flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                            !products.next_page_url 
                                ? "pointer-events-none opacity-40 cursor-not-allowed"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 dark:active:bg-gray-700"
                        } ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                        Next
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>

            {/* Tablet Layout - Horizontal with page numbers */}
            <div className="hidden sm:flex sm:flex-row items-center justify-between gap-4">
                {/* Previous Button */}
                <Link
                    href={products.prev_page_url ?? '#'}
                    onClick={handleClick}
                    className={`inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm font-medium transition-all duration-200 ${
                        !products.prev_page_url 
                            ? "pointer-events-none opacity-40 cursor-not-allowed"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:scale-105 active:scale-95"
                    } ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
                >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                </Link>

                {/* Page Numbers - Tablet & Desktop */}
                <div className="hidden sm:flex items-center gap-1.5">
                    {getPageNumbers().map((page, index) => (
                        page === '...' ? (
                            <span key={`dots-${index}`} className="px-2 text-gray-400 dark:text-gray-600 text-sm">
                                ...
                            </span>
                        ) : (
                            <Link
                                key={page}
                                href={`${products.path}?page=${page}`}
                                onClick={handleClick}
                                className={`min-w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 ${
                                    products.current_page === page
                                        ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 shadow-md"
                                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105"
                                } ${isLoading ? 'pointer-events-none opacity-50' : ''}`}
                            >
                                {page}
                            </Link>
                        )
                    ))}
                </div>

                {/* Page Indicator - Tablet */}
                <div className="hidden sm:flex md:hidden items-center gap-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-medium text-gray-900 dark:text-gray-100">{products.current_page}</span>
                        <span className="mx-1 text-gray-400 dark:text-gray-600">/</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">{products.last_page}</span>
                    </span>
                </div>

                {/* Next Button */}
                <Link
                    href={products.next_page_url ?? '#'}
                    onClick={handleClick}
                    className={`inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm font-medium transition-all duration-200 ${
                        !products.next_page_url 
                            ? "pointer-events-none opacity-40 cursor-not-allowed"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:scale-105 active:scale-95"
                    } ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
                >
                    Next
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </div>
    );
}