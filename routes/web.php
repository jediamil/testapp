<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Inventory\ProductController;

Route::inertia('/', 'auth/login')->name('home');

// Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    
    // Inventory routes
    Route::get('/inventory', [ProductController::class, 'index'])->name('inventory.index');
    Route::post('/inventory/add', [ProductController::class, 'store'])->name('inventory.store');
    Route::delete('/inventory/delete/{product}', [ProductController::class, 'destroy'])->name('inventory.destroy');
// });



require __DIR__.'/settings.php';
