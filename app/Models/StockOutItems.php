<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class StockOutItems extends Model
{
    protected $fillable = [
        'stock_out_id',
        'product_id',
        'quantity',
        'price',
    ];

    public function stockOut()
    {
        return $this->belongsTo(StockOuts::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
