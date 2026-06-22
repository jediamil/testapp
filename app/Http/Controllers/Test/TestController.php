<?php

namespace App\Http\Controllers\Test;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\StockOuts;
use App\Models\StockOutItems;
use Illuminate\Support\Facades\DB;


class TestController extends Controller
{
    public function testCheckout()
    {
        DB::transaction(function () {

            $stockOut = StockOuts::create([
                'reference_no' => 'SO-' . now()->timestamp,
                'user_id' => auth()->id(),
                'remarks' => 'Dummy checkout',
            ]);

            $items = [
                [
                    'product_id' => 1,
                    'quantity' => 5,
                ],
                [
                    'product_id' => 2,
                    'quantity' => 10,
                ],
            ];

            foreach ($items as $item) {

                $product = Product::findOrFail(
                    $item['product_id']
                );

                if ($product->stocks < $item['quantity']) {
                    throw new \Exception(
                        "{$product->name} has insufficient stock."
                    );
                }

                $stockOut->items()->create([
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                    'price' => $product->price,
                ]);

                $product->decrement(
                    'stocks',
                    $item['quantity']
                );
            }
        });

        return 'Checkout Successful';
    }
}
