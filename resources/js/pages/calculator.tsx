import { calculator } from "@/routes/inventory";
import { useState } from "react";
import { 
    Calculator, 
    DollarSign, 
    TrendingUp, 
    Package, 
    Percent,
    RefreshCw,
    ArrowUpRight,
    ArrowDownRight,
    Minus
} from 'lucide-react';

interface ProfitProps {
    name: string;
    cost_price: number;
    profit_percentage: number;
    quantity: number;
}

interface Props {
    ProfitData: ProfitProps;
}

export default function ProfitCalculator({ ProfitData }: Props) {
    const [quantity, setQuantity] = useState(ProfitData.quantity || 1);
    const [costPrice, setCostPrice] = useState(ProfitData.cost_price || 0);
    const [profitPercentage, setProfitPercentage] = useState(ProfitData.profit_percentage || 0);

    // Calculations
    const totalCost = costPrice * quantity;
    const profitPerItem = (costPrice * profitPercentage) / 100;
    const sellingPricePerItem = costPrice + profitPerItem;
    const totalProfit = profitPerItem * quantity;
    const totalRevenue = sellingPricePerItem * quantity;
    const profitMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;

    // Format currency (Philippine Peso)
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('fil-PH', {
            style: 'currency',
            currency: 'PHP',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount);
    };

    // Reset to original values
    const handleReset = () => {
        setQuantity(ProfitData.quantity || 1);
        setCostPrice(ProfitData.cost_price || 0);
        setProfitPercentage(ProfitData.profit_percentage || 0);
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
                            Calculate profit margins for {ProfitData.name}
                        </p>
                    </div>
                    <button
                        onClick={handleReset}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg
                                 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700
                                 text-gray-700 dark:text-gray-300 transition-all duration-200"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Reset
                    </button>
                </div>

                {/* Main Calculator Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Input Section */}
                    <div className="lg:col-span-1 space-y-4">
                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <Calculator className="w-4 h-4" />
                                Input Values
                            </h3>

                            {/* Product Name */}
                            <div className="mb-4">
                                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                                    Product Name
                                </label>
                                <div className="px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm text-gray-900 dark:text-white">
                                    {ProfitData.name}
                                </div>
                            </div>

                            {/* Cost Price */}
                            <div className="mb-4">
                                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                                    Cost Price (per item)
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <span className="text-gray-400 font-medium text-sm">₱</span>
                                    </div>
                                    <input
                                        type="number"
                                        value={costPrice}
                                        onChange={(e) => setCostPrice(parseFloat(e.target.value) || 0)}
                                        min="0"
                                        step="0.01"
                                        className="w-full pl-8 pr-3 py-2 text-sm rounded-lg
                                                 border border-gray-200 dark:border-gray-700
                                                 bg-white dark:bg-gray-900
                                                 text-gray-900 dark:text-white
                                                 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent
                                                 transition-all duration-200"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>

                            {/* Profit Percentage */}
                            <div className="mb-4">
                                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                                    Profit Percentage
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <Percent className="w-4 h-4 text-gray-400" />
                                    </div>
                                    <input
                                        type="number"
                                        value={profitPercentage}
                                        onChange={(e) => setProfitPercentage(parseFloat(e.target.value) || 0)}
                                        min="0"
                                        step="0.1"
                                        className="w-full pl-9 pr-3 py-2 text-sm rounded-lg
                                                 border border-gray-200 dark:border-gray-700
                                                 bg-white dark:bg-gray-900
                                                 text-gray-900 dark:text-white
                                                 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent
                                                 transition-all duration-200"
                                        placeholder="0"
                                    />
                                </div>
                            </div>

                            {/* Quantity */}
                            <div className="mb-4">
                                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                                    Quantity
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <Package className="w-4 h-4 text-gray-400" />
                                    </div>
                                    <input
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                        min="1"
                                        step="1"
                                        className="w-full pl-9 pr-3 py-2 text-sm rounded-lg
                                                 border border-gray-200 dark:border-gray-700
                                                 bg-white dark:bg-gray-900
                                                 text-gray-900 dark:text-white
                                                 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent
                                                 transition-all duration-200"
                                        placeholder="1"
                                    />
                                </div>
                            </div>

                            {/* Default values */}
                            <div className="text-xs text-gray-400 dark:text-gray-500 space-y-1">
                                <p>Default Cost: {formatCurrency(ProfitData.cost_price)}</p>
                                <p>Default Profit: {ProfitData.profit_percentage}%</p>
                                <p>Default Qty: {ProfitData.quantity}</p>
                            </div>
                        </div>
                    </div>

                    {/* Results Section */}
                    <div className="lg:col-span-2 space-y-4">
                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Total Cost</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                                            {formatCurrency(totalCost)}
                                        </p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-950/30 flex items-center justify-center">
                                        <span className="text-blue-600 dark:text-blue-400 font-bold">₱</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Total Revenue</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                                            {formatCurrency(totalRevenue)}
                                        </p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-950/30 flex items-center justify-center">
                                        <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Profit Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Per Item</p>
                                <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                                    {formatCurrency(profitPerItem)}
                                </p>
                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                                    Selling: {formatCurrency(sellingPricePerItem)}
                                </p>
                            </div>

                            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Total Profit</p>
                                <p className={`text-lg font-bold mt-1 ${totalProfit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                    {formatCurrency(totalProfit)}
                                </p>
                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                                    {totalProfit >= 0 ? 'Profit' : 'Loss'}
                                </p>
                            </div>

                            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Profit Margin</p>
                                <p className={`text-lg font-bold mt-1 ${profitMargin >= 30 ? 'text-green-600 dark:text-green-400' : profitMargin >= 15 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'}`}>
                                    {profitMargin.toFixed(1)}%
                                </p>
                                <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mt-2 overflow-hidden">
                                    <div 
                                        className={`h-full rounded-full transition-all duration-500 ${
                                            profitMargin >= 30 ? 'bg-green-500' : 
                                            profitMargin >= 15 ? 'bg-yellow-500' : 
                                            'bg-red-500'
                                        }`}
                                        style={{ width: `${Math.min(profitMargin, 100)}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Detailed Breakdown */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                                Detailed Breakdown
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 dark:text-gray-400">Cost Price</span>
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {formatCurrency(costPrice)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 dark:text-gray-400">Profit %</span>
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {profitPercentage}%
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 dark:text-gray-400">Selling Price</span>
                                        <span className="font-medium text-emerald-600 dark:text-emerald-400">
                                            {formatCurrency(sellingPricePerItem)}
                                        </span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 dark:text-gray-400">Quantity</span>
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {quantity}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 dark:text-gray-400">Total Cost</span>
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {formatCurrency(totalCost)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 dark:text-gray-400">Total Revenue</span>
                                        <span className="font-medium text-purple-600 dark:text-purple-400">
                                            {formatCurrency(totalRevenue)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Profit Status Indicator */}
                        <div className={`p-4 rounded-xl border ${
                            totalProfit > 0 
                                ? 'bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800' 
                                : totalProfit < 0 
                                ? 'bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800'
                                : 'bg-gray-50 border-gray-200 dark:bg-gray-900/50 dark:border-gray-700'
                        }`}>
                            <div className="flex items-center gap-3">
                                {totalProfit > 0 ? (
                                    <ArrowUpRight className="w-5 h-5 text-green-600 dark:text-green-400" />
                                ) : totalProfit < 0 ? (
                                    <ArrowDownRight className="w-5 h-5 text-red-600 dark:text-red-400" />
                                ) : (
                                    <Minus className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                )}
                                <div>
                                    <p className={`text-sm font-medium ${
                                        totalProfit > 0 
                                            ? 'text-green-700 dark:text-green-400' 
                                            : totalProfit < 0 
                                            ? 'text-red-700 dark:text-red-400'
                                            : 'text-gray-600 dark:text-gray-400'
                                    }`}>
                                        {totalProfit > 0 
                                            ? `You will make ${formatCurrency(totalProfit)} profit from this product!` 
                                            : totalProfit < 0 
                                            ? `You will lose ${formatCurrency(Math.abs(totalProfit))} from this product.`
                                            : 'No profit or loss from this product.'}
                                    </p>
                                    {totalProfit > 0 && (
                                        <p className="text-xs text-green-600 dark:text-green-400 mt-0.5">
                                            Profit margin: {profitMargin.toFixed(1)}% • {formatCurrency(profitPerItem)} per item
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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