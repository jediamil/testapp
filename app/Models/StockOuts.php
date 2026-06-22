<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StockOuts extends Model
{
    protected $fillable = [
        'reference_no',
        'user_id',
        'remarks',
    ];

    public function items()
    {
        return $this->hasMany(StockOutItems::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
