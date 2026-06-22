import { calculator } from "@/routes/inventory";
import { useState, useEffect } from "react"; // Add useEffect import
import { router } from '@inertiajs/react';
import { 
    PhilippinePeso,
    Calculator, 
    DollarSign, 
    TrendingUp, 
    Package, 
    Percent,
    RefreshCw,
    ArrowUpRight,
    ArrowDownRight,
    Minus,
    Plus,
    Trash2,
    Edit,
    X,
    Check,
    Loader2
} from 'lucide-react';
import { store, destroy} from '@/routes/profitcalculator';

interface ProfitProps {
    id: number;
    name: string;
    cost_price: number;
    profit_percentage: number;
    quantity: number;
    category: string;
}

interface Props {
    ProfitData: ProfitProps[];
    flash?: {
        message?: string;
        error?: string;
    };
}

export default function ProfitCalculator({ ProfitData, flash }: Props) {
    const [items, setItems] = useState<ProfitProps[]>(ProfitData || []);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<Partial<ProfitProps>>({});
    const [showAddForm, setShowAddForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState<number | null>(null);
    const [successMessage, setSuccessMessage] = useState(flash?.message || '');
    const [errorMessage, setErrorMessage] = useState(flash?.error || '');
    
    const [newItem, setNewItem] = useState<Partial<ProfitProps>>({
        name: '',
        cost_price: 0,
        profit_percentage: 0,
        quantity: 1,
        category: '',
    });

    // ✅ ADD THIS: Sync items with ProfitData prop whenever it changes
    useEffect(() => {
        setItems(ProfitData || []);
    }, [ProfitData]);

    // ✅ ADD THIS: Handle flash messages from server
    useEffect(() => {
        if (flash?.message) {
            setSuccessMessage(flash.message);
            setTimeout(() => setSuccessMessage(''), 5000);
        }
        if (flash?.error) {
            setErrorMessage(flash.error);
            setTimeout(() => setErrorMessage(''), 5000);
        }
    }, [flash]);

    // Calculate totals for all items
    const calculateItemProfit = (item: ProfitProps) => {
        const totalCost = item.cost_price * item.quantity;
        const profitPerItem = (item.cost_price * item.profit_percentage) / 100;
        const sellingPricePerItem = item.cost_price + profitPerItem;
        const totalProfit = profitPerItem * item.quantity;
        const totalRevenue = sellingPricePerItem * item.quantity;
        const profitMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;

        return {
            totalCost,
            profitPerItem,
            sellingPricePerItem,
            totalProfit,
            totalRevenue,
            profitMargin
        };
    };

    // Overall totals
    const overallTotals = items.reduce((acc, item) => {
        const calc = calculateItemProfit(item);
        return {
            totalCost: acc.totalCost + calc.totalCost,
            totalProfit: acc.totalProfit + calc.totalProfit,
            totalRevenue: acc.totalRevenue + calc.totalRevenue,
            totalQuantity: acc.totalQuantity + item.quantity
        };
    }, { totalCost: 0, totalProfit: 0, totalRevenue: 0, totalQuantity: 0 });

    const overallProfitMargin = overallTotals.totalRevenue > 0 
        ? (overallTotals.totalProfit / overallTotals.totalRevenue) * 100 
        : 0;

    // Format currency (Philippine Peso)
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('fil-PH', {
            style: 'currency',
            currency: 'PHP',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount);
    };

    // Handle add new item - POST to backend
    const handleAddItem = () => {
        if (!newItem.name || newItem.cost_price === undefined || newItem.profit_percentage === undefined) {
            setErrorMessage('Please fill in all required fields');
            return;
        }

        setIsSubmitting(true);
        setErrorMessage('');
        
        router.post(store().url, {
            name: newItem.name,
            cost_price: newItem.cost_price,
            profit_percentage: newItem.profit_percentage,
            quantity: newItem.quantity || 1,
            category: newItem.category,
        }, {
            onSuccess: () => {
                setSuccessMessage('Item added successfully!');
                setNewItem({ name: '', cost_price: 0, profit_percentage: 0, quantity: 1 });
                setShowAddForm(false);
                setIsSubmitting(false);
                
                // Refresh the page to get updated data
                router.reload({ only: ['ProfitData'] });
            },
            onError: (errors) => {
                setErrorMessage(errors.message || 'Failed to add item');
                setIsSubmitting(false);
            }
        });
    };

    // Handle edit - PUT to backend
    // const handleSaveEdit = () => {
    //     if (editingId !== null && editForm) {
    //         setIsSubmitting(true);
            
    //         router.put(`/inventory/calculator/${editingId}`, editForm, {
    //             onSuccess: () => {
    //                 setSuccessMessage('Item updated successfully!');
    //                 setEditingId(null);
    //                 setEditForm({});
    //                 setIsSubmitting(false);
    //                 router.reload({ only: ['ProfitData'] });
    //             },
    //             onError: (errors) => {
    //                 setErrorMessage(errors.message || 'Failed to update item');
    //                 setIsSubmitting(false);
    //             }
    //         });
    //     }
    // };

    // Handle delete - DELETE to backend
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this item?')) {
            setIsDeleting(id);
            
            router.delete(destroy(id).url, {
                onSuccess: () => {
                    setSuccessMessage('Item deleted successfully!');
                    setIsDeleting(null);
                    router.reload({ only: ['ProfitData'] });
                },
                onError: (errors) => {
                    setErrorMessage(errors.message || 'Failed to delete item');
                    setIsDeleting(null);
                }
            });
        }
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditForm({});
    };

    // Handle reset
    const handleReset = () => {
        router.reload({ only: ['ProfitData'] });
        setShowAddForm(false);
        setEditingId(null);
        setSuccessMessage('');
        setErrorMessage('');
    };

    // Add state
    const [filter, setFilter] = useState('all');

    // Add handler
    const handleFilterChange = (value: string) => {
        setFilter(value);
        
        // Send 'category' as the parameter name, not 'filter'
        // If value is 'all', don't send it or send empty
        router.get(calculator().url, { 
            category: value === 'all' ? '' : value 
        }, {
            preserveState: true,
            preserveScroll: true
        });
    };

    return (
        <>
            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Profit Calculator
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Calculate and manage profit for multiple items
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        {/* Left side - Title */}
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Profit Calculator
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                Calculate and manage profit for multiple items
                            </p>
                        </div>

                        {/* Right side - Filters and Actions */}
                        <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2">
                            {/* Filter Dropdown */}
                            <div className="relative">
                                <select
                                    onChange={(e) => handleFilterChange(e.target.value)}
                                    className="appearance-none px-4 py-2 pr-10 text-sm font-medium rounded-lg
                                            border border-gray-200 dark:border-gray-700
                                            bg-white dark:bg-gray-900
                                            text-gray-700 dark:text-gray-300
                                            focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent
                                            hover:border-gray-300 dark:hover:border-gray-600
                                            cursor-pointer transition-all duration-200
                                            min-w-35"
                                    defaultValue="all"
                                >
                                    <option value="all">All Types</option>
                                    <option value="trading">📈 Trading</option>
                                    <option value="agent">👤 Agent</option>
                                    <option value="srp">🏷️ SRP</option>
                                </select>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setShowAddForm(true)}
                                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg
                                            bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600
                                            text-white transition-all duration-200
                                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                                            dark:focus:ring-offset-gray-900"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Item
                                </button>
                                <button
                                    onClick={handleReset}
                                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg
                                            bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700
                                            text-gray-700 dark:text-gray-300 transition-all duration-200
                                            focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
                                            dark:focus:ring-offset-gray-900"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                    Refresh
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Success/Error Messages */}
                {successMessage && (
                    <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                            <Check className="w-5 h-5" />
                            <span className="text-sm font-medium">{successMessage}</span>
                        </div>
                    </div>
                )}
                
                {errorMessage && (
                    <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                            <X className="w-5 h-5" />
                            <span className="text-sm font-medium">{errorMessage}</span>
                        </div>
                    </div>
                )}

                {/* Add Item Form */}
                {showAddForm && (
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <Plus className="w-4 h-4" />
                            Add New Item
                        </h3>
                        <form onSubmit={(e) => { e.preventDefault(); handleAddItem(); }}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                                        Item Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={newItem.name}
                                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700
                                                 bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                                                 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent
                                                 transition-all duration-200"
                                        placeholder="Enter item name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                                        Cost Price (₱) *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <span className="text-gray-400 font-medium">₱</span>
                                        </div>
                                        <input
                                            type="number"
                                            value={newItem.cost_price}
                                            onChange={(e) => setNewItem({ ...newItem, cost_price: parseFloat(e.target.value) || 0 })}
                                            className="w-full pl-8 pr-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700
                                                     bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                                                     focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent
                                                     transition-all duration-200"
                                            placeholder="0.00"
                                            min="0"
                                            step="0.01"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                                        Profit % *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <Percent className="w-4 h-4 text-gray-400" />
                                        </div>
                                        <input
                                            type="number"
                                            value={newItem.profit_percentage}
                                            onChange={(e) => setNewItem({ ...newItem, profit_percentage: parseFloat(e.target.value) || 0 })}
                                            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700
                                                     bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                                                     focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent
                                                     transition-all duration-200"
                                            placeholder="0"
                                            min="0"
                                            step="0.1"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                                        Quantity
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <Package className="w-4 h-4 text-gray-400" />
                                        </div>
                                        <input
                                            type="number"
                                            value={newItem.quantity}
                                            onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 1 })}
                                            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700
                                                     bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                                                     focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent
                                                     transition-all duration-200"
                                            placeholder="1"
                                            min="1"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                                        Category
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <Package className="w-4 h-4 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            value={newItem.category}
                                            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                                            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700
                                                     bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                                                     focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent
                                                     transition-all duration-200"
                                            placeholder="Trading"
                                            min="1"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-end gap-2">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 px-4 py-2 text-sm font-medium rounded-lg 
                                                 bg-green-600 hover:bg-green-700 disabled:bg-green-400
                                                 text-white transition-all duration-200
                                                 flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <Check className="w-4 h-4" />
                                                Add Item
                                            </>
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowAddForm(false)}
                                        className="px-4 py-2 text-sm font-medium rounded-lg 
                                                 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 
                                                 text-gray-700 dark:text-gray-300 transition-all duration-200"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                )}

                {/* Overall Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Total Items</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                                    {items.length}
                                </p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-950/30 flex items-center justify-center">
                                <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Total Cost</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                                    {formatCurrency(overallTotals.totalCost)}
                                </p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-950/30 flex items-center justify-center">
                                <PhilippinePeso  className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Total Profit</p>
                                <p className={`text-2xl font-bold mt-1 ${overallTotals.totalProfit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                    {formatCurrency(overallTotals.totalProfit)}
                                </p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-950/30 flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
                        <div>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Overall Margin</p>
                            <p className={`text-2xl font-bold mt-1 ${overallProfitMargin >= 30 ? 'text-green-600 dark:text-green-400' : overallProfitMargin >= 15 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'}`}>
                                {overallProfitMargin.toFixed(1)}%
                            </p>
                            <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mt-2 overflow-hidden">
                                <div 
                                    className={`h-full rounded-full transition-all duration-500 ${
                                        overallProfitMargin >= 30 ? 'bg-green-500' : 
                                        overallProfitMargin >= 15 ? 'bg-yellow-500' : 
                                        'bg-red-500'
                                    }`}
                                    style={{ width: `${Math.min(overallProfitMargin, 100)}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Items List */}
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 dark:bg-gray-900/50">
                                <tr className="border-b border-gray-200 dark:border-gray-800">
                                    <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Item
                                    </th>
                                    <th className="text-right py-3.5 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Cost Price
                                    </th>
                                    <th className="text-right py-3.5 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Profit %
                                    </th>
                                    <th className="text-right py-3.5 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Qty
                                    </th>
                                    <th className="text-right py-3.5 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Selling Price
                                    </th>
                                    <th className="text-right py-3.5 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Total Profit
                                    </th>
                                    <th className="text-right py-3.5 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Margin
                                    </th>
                                    <th className="text-center py-3.5 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800/50">
                                {items.length > 0 ? (
                                    items.map((item) => {
                                        const calc = calculateItemProfit(item);
                                        const isEditing = editingId === item.id;
                                        const isDeletingThis = isDeleting === item.id;
                                        
                                        return (
                                            <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/40 transition-colors">
                                                <td className="py-3 px-4">
                                                    {isEditing ? (
                                                        <input
                                                            type="text"
                                                            value={editForm.name || ''}
                                                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                                            className="w-full px-2 py-1 text-sm rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-400"
                                                        />
                                                    ) : (
                                                        <span className="font-medium text-gray-900 dark:text-white">{item.name}</span>
                                                    )}
                                                </td>
                                                <td className="py-3 px-4 text-right">
                                                    {isEditing ? (
                                                        <input
                                                            type="number"
                                                            value={editForm.cost_price || 0}
                                                            onChange={(e) => setEditForm({ ...editForm, cost_price: parseFloat(e.target.value) || 0 })}
                                                            className="w-24 px-2 py-1 text-sm rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-right focus:outline-none focus:ring-2 focus:ring-gray-400"
                                                            step="0.01"
                                                        />
                                                    ) : (
                                                        <span className="text-gray-900 dark:text-white">{formatCurrency(item.cost_price)}</span>
                                                    )}
                                                </td>
                                                <td className="py-3 px-4 text-right">
                                                    {isEditing ? (
                                                        <input
                                                            type="number"
                                                            value={editForm.profit_percentage || 0}
                                                            onChange={(e) => setEditForm({ ...editForm, profit_percentage: parseFloat(e.target.value) || 0 })}
                                                            className="w-20 px-2 py-1 text-sm rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-right focus:outline-none focus:ring-2 focus:ring-gray-400"
                                                            step="0.1"
                                                        />
                                                    ) : (
                                                        <span className="text-gray-900 dark:text-white">{item.profit_percentage}%</span>
                                                    )}
                                                </td>
                                                <td className="py-3 px-4 text-right">
                                                    {isEditing ? (
                                                        <input
                                                            type="number"
                                                            value={editForm.quantity || 1}
                                                            onChange={(e) => setEditForm({ ...editForm, quantity: parseInt(e.target.value) || 1 })}
                                                            className="w-16 px-2 py-1 text-sm rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-right focus:outline-none focus:ring-2 focus:ring-gray-400"
                                                            min="1"
                                                        />
                                                    ) : (
                                                        <span className="text-gray-900 dark:text-white">{item.quantity}</span>
                                                    )}
                                                </td>
                                                <td className="py-3 px-4 text-right font-medium text-emerald-600 dark:text-emerald-400">
                                                    {formatCurrency(calc.sellingPricePerItem)}
                                                </td>
                                                <td className={`py-3 px-4 text-right font-medium ${calc.totalProfit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                                    {formatCurrency(calc.totalProfit)}
                                                </td>
                                                <td className="py-3 px-4 text-right">
                                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                        calc.profitMargin >= 30 ? 'bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400' :
                                                        calc.profitMargin >= 15 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-400' :
                                                        'bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400'
                                                    }`}>
                                                        {calc.profitMargin.toFixed(1)}%
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <div className="flex items-center justify-center gap-1.5">
                                                        {isEditing ? (
                                                            <>
                                                                <button
                                                                    // onClick={handleSaveEdit}
                                                                    disabled={isSubmitting}
                                                                    className="p-1.5 text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-950/30 rounded-lg transition-all duration-200 disabled:opacity-50"
                                                                    title="Save"
                                                                >
                                                                    {isSubmitting ? (
                                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                                    ) : (
                                                                        <Check className="w-4 h-4" />
                                                                    )}
                                                                </button>
                                                                <button
                                                                    onClick={handleCancelEdit}
                                                                    className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
                                                                    title="Cancel"
                                                                >
                                                                    <X className="w-4 h-4" />
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <>
                                                                {/* <button
                                                                    // onClick={() => handleEdit(item)}
                                                                    className="p-1.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg transition-all duration-200"
                                                                    title="Edit"
                                                                >
                                                                    <Edit className="w-4 h-4" />
                                                                </button> */}
                                                                <button
                                                                    onClick={() => handleDelete(item.id)}
                                                                    disabled={isDeletingThis}
                                                                    className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-all duration-200 disabled:opacity-50"
                                                                    title="Delete"
                                                                >
                                                                    {isDeletingThis ? (
                                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                                    ) : (
                                                                        <Trash2 className="w-4 h-4" />
                                                                    )}
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={8} className="text-center py-12">
                                            <div className="flex flex-col items-center gap-3">
                                                <Package className="w-12 h-12 text-gray-300 dark:text-gray-600" />
                                                <p className="text-sm text-gray-500 dark:text-gray-400">No items added yet</p>
                                                <button
                                                    onClick={() => setShowAddForm(true)}
                                                    className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                                                >
                                                    Add your first item →
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Summary Footer */}
                {items.length > 0 && (
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Total Items</p>
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">{items.length}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Total Quantity</p>
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">{overallTotals.totalQuantity}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Total Cost</p>
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">{formatCurrency(overallTotals.totalCost)}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Total Profit</p>
                                <p className={`text-lg font-semibold ${overallTotals.totalProfit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                    {formatCurrency(overallTotals.totalProfit)}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

ProfitCalculator.layout = {
    breadcrumbs: [
        {
            title: 'Calculator',
            href: calculator(),
        },
    ],
};