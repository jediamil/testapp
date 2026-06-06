<?php

namespace App\Http\Controllers\Inventory;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Http\Requests\Inventory\AddProductRequest;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('inventory', [
            'products' => Product::query()
            ->select([
                'id',
                'sku',
                'name',
                'price',
                'stocks',
                'min_stock',
                'unit',
                'created_at',
            ])
            ->paginate(20),
        ]);
    }

    public function store(AddProductRequest $request)
    {
        Product::create($request->validated());

        Inertia::flash('toast', ['message' => 'Item successfully added!']);
        return redirect()->back();
    }

    public function destroy(Product $product) 
    {
        $product->delete();

        Inertia::flash('toast', ['message' => 'Item successfully deleted!']);
        return redirect()->back();
    }
}
