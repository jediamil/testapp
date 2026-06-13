import { index, store } from "@/routes/inventory";
import { Head, useForm, usePage, Link } from "@inertiajs/react";
import { useState, useMemo, useDeferredValue, useEffect } from "react";
import { Search } from "lucide-react";
import Modal from "@/components/modals/modal-template";
import ProductTableForDesktop from "@/components/inventory/product-table-for-desktop";
import ProductTableForMobile from "@/components/inventory/product-table-for-mobile";
import PaginationButton from "@/components/inventory/pagination-button";
import type { ProductPagination } from "@/types/product";
import AddProductModal from "@/components/inventory/add-product-modal";

interface Props {
    products: ProductPagination;
}

export default function Inventory({ products }: Props) {
    const [search, setSearch] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    
    const deferredSearch = useDeferredValue(search);
    const { flash } = usePage();

    // Optimized search filter
    const searchTerm = deferredSearch.trim().toLowerCase();
    const filteredProducts = useMemo(() => {
        if (!searchTerm) {
            return products.data;
        }

        return products.data.filter(product => {
            const searchableText =
                `${product.name} ${product.sku}`.toLowerCase();

            return searchableText.includes(searchTerm);
        });
    }, [products.data, searchTerm]);

    useEffect(() => {
        if (flash?.toast?.message) {
            setShowSuccessModal(true);
        }
    }, [flash]);

    return (
        <div className="p-4 sm:p-6 md:p-8">
            <Head title="Inventory" />

            {/* Header Section */}
            <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Inventory</h1>
                    <p className="text-gray-400">Track and manage your stock levels</p>
                </div>
                
                
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    {/* Search Input */}
                    <div className="relative flex-1 sm:flex-initial">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search products..."
                            className="pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-gray-300 dark:focus:border-gray-600 focus:ring-1 focus:ring-gray-200 dark:focus:ring-gray-700 transition-all w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        />
                    </div>

                    {/* Add Product Button */}
                    <button
                        onClick={() => setShowModal(true)}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 dark:bg-gray-100 px-4 py-2 text-sm font-medium text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                    >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        Add Product
                    </button>
                </div>
            </div>

            {/* Add Product Modal */}
            <AddProductModal show={showModal} onClose={() => setShowModal(false)} />
           

            {/* Success Modal */}
            <Modal show={showSuccessModal} onClose={() => setShowSuccessModal(false)}>
                <div className="p-8 bg-white dark:bg-gray-900 rounded-lg animate-in fade-in zoom-in duration-200">
                    <div className="flex flex-col items-center text-center">
                        <div className="mb-4">
                            <svg
                                className="h-12 w-12 text-green-500 dark:text-green-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1.5}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>

                        <h2 className="text-xl font-light tracking-tight text-gray-900 dark:text-white">
                            Success
                        </h2>
                        
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            {flash?.toast?.message}
                        </p>

                        <button
                            onClick={() => setShowSuccessModal(false)}
                            className="mt-6 rounded-lg px-6 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Product Tables Mobile View */}
            <ProductTableForMobile filteredProducts={filteredProducts} />

            {/* Product Tables For Desktop View */}
            <ProductTableForDesktop 
                filteredProducts={filteredProducts} 
            />

            {/* Pagination */}
            <PaginationButton
                current_page={products.current_page}
                last_page={products.last_page}
                path={products.path}
                prev_page_url={products.prev_page_url}
                next_page_url={products.next_page_url}
            />
        </div>
    );
}

Inventory.layout = {
    breadcrumbs: [
        {
            title: 'Inventory',
            href: index().url,
        },
    ],
};