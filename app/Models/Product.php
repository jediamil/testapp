<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use App\Models\StockOutItems;


#[Fillable([
    'sku',
    'name',
    'description',
    'price',
    'unit',
    'min_stock',
    'stocks',
])]
class Product extends Model
{
    public function stockOutItems()
    {
        return $this->hasMany(StockOutItems::class);
    }
}
