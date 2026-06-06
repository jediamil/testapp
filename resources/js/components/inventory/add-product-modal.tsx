import { store } from "@/routes/inventory";
import Modal from "@/components/modals/modal-template";
import { useForm } from "@inertiajs/react";

type AddProductModalProps = {
    show: boolean;
    onClose: () => void;
};

export default function AddProductModal({
    show, onClose,
}: AddProductModalProps) {

    const { data, setData, post, processing, errors, reset } = useForm({
        sku: '',
        name: '',
        price: '',
        stocks: '',
        unit: '',
    });

    const handleSubmit = (e: React.ChangeEvent) => {
            e.preventDefault();
            post(store().url, {
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        };

    return (
        <Modal show={show} onClose={onClose}>
                <div className="p-6 bg-white dark:bg-gray-900 rounded-lg animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-light tracking-tight text-gray-900 dark:text-gray-100">
                            Add Product
                        </h2>
                        <button
                            onClick={onClose}
                            className="rounded-lg p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            {/* SKU Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    SKU
                                </label>
                                <input 
                                    type="text"
                                    value={data.sku}
                                    onChange={(e) => setData('sku', e.target.value)}
                                    placeholder="Enter product SKU" 
                                    className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-gray-300 dark:focus:border-gray-600 focus:ring-1 focus:ring-gray-200 dark:focus:ring-gray-700 transition-colors"
                                />
                                {errors.sku && (
                                    <p className="mt-1 text-sm text-red-500">{errors.sku}</p>
                                )}
                            </div>

                            {/* Product Name Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Enter product name"
                                    className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-gray-300 dark:focus:border-gray-600 focus:ring-1 focus:ring-gray-200 dark:focus:ring-gray-700 transition-colors"
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                                )}
                            </div>

                            {/* Price Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Price
                                </label>
                                <input
                                    type="number"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    step="0.01"
                                    placeholder="0.00"
                                    className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-gray-300 dark:focus:border-gray-600 focus:ring-1 focus:ring-gray-200 dark:focus:ring-gray-700 transition-colors"
                                />
                                {errors.price && (
                                    <p className="mt-1 text-sm text-red-500">{errors.price}</p>
                                )}
                            </div>

                            {/* Stock Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Stock
                                </label>
                                <input
                                    type="number"
                                    value={data.stocks}
                                    onChange={(e) => setData('stocks', e.target.value)}
                                    placeholder="0"
                                    className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-gray-300 dark:focus:border-gray-600 focus:ring-1 focus:ring-gray-200 dark:focus:ring-gray-700 transition-colors"
                                />
                                {errors.stocks && (
                                    <p className="mt-1 text-sm text-red-500">{errors.stocks}</p>
                                )}
                            </div>

                            {/* Unit Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Unit
                                </label>
                                <select
                                    value={data.unit}
                                    onChange={(e) => setData('unit', e.target.value)}
                                    className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:border-gray-300 dark:focus:border-gray-600 focus:ring-1 focus:ring-gray-200 dark:focus:ring-gray-700 transition-colors"
                                >
                                    <option value="">Select unit</option>
                                    <option value="pcs">Pieces (pcs)</option>
                                    <option value="roll">Roll</option>
                                    <option value="box">Box</option>
                                    <option value="bundle">Bundle</option>
                                    <option value="ton">Ton</option>
                                    <option value="kg">Kilogram (kg)</option>
                                    <option value="meter">Meter</option>
                                </select>
                                {errors.unit && (
                                    <p className="mt-1 text-sm text-red-500">{errors.unit}</p>
                                )}
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="mt-6 flex gap-3">
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex-1 rounded-lg bg-gray-900 dark:bg-gray-100 px-4 py-2 text-sm font-medium text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? 'Saving...' : 'Save Product'}
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
    )
}