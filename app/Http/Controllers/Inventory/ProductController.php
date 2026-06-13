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
            ])
            ->paginate(20),
        ]);
    }

    public function store(AddProductRequest $request)
    {
        $product = Product::create($request->validated());

        activity()
            ->causedBy(auth()->user())
            ->performedOn($product)
            ->withProperties([
                'sku' => $product->sku,
                'name' => $product->name,
                'price' => $product->price,
                'stocks' => $product->stocks,
                'unit' => $product->unit,
            ])->log('product created');
        Inertia::flash('toast', ['message' => $product->name . ' successfully added!']);
        return redirect()->back();
    }

    public function destroy(Product $product) 
    {
        $product->delete();

        Inertia::flash('toast', ['message' => $product->name . ' successfully deleted!']);
        return redirect()->back();
    }

    public function update(Product $product, AddProductRequest $request)
    {
        $product->update($request->validated());
        
        Inertia::flash('toast', ['message' => $product->name . ' Item successfully updated!']);
        return redirect()->back();
    }
}
