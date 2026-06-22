<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProfitCalculation extends Model
{
    protected $fillable = [
        'name',
        'cost_price',
        'quantity',
        'profit_percentage',
        'category',
    ];
}
