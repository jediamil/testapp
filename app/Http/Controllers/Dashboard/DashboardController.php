<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboard', [
            'StockItems' => Product::query()
            ->select([
                'stocks',
                'min_stock',
            ])->get(),
        ]);
    }
}
