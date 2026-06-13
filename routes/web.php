<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Inventory\ProductController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\AcivityLogs\LogsController;

Route::inertia('/', 'auth/login')->name('home');

// Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    
    // Inventory routes
    Route::get('/inventory', [ProductController::class, 'index'])->name('inventory.index');
    Route::post('/inventory/add', [ProductController::class, 'store'])->name('inventory.store');
    Route::delete('/inventory/delete/{product}', [ProductController::class, 'destroy'])->name('inventory.destroy');
    Route::post('/inventory/update/{product}', [ProductController::class, 'update'])->name('inventory.update');

    // Dashboard routes
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Activity logs route
    Route::get('/activity-logs', [LogsController::class, 'index'])->name('activity.logs');
// });



require __DIR__.'/settings.php';
