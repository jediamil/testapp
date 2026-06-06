<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;


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
    //
}
