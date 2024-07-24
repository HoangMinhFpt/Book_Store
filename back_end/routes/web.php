<?php

// use App\Http\Controllers\Api\ProductController;

use App\Http\Controllers\BooksController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get(
    '/', function () {
        return view('welcome');
    }
);

Route::get(
    '/dashboard', function () {
        return view('dashboard');
    }
)->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__.'/auth.php';

Route::middleware(['auth','admin'])->group(
    function () {
        Route::get('admin/dashboard', [HomeController::class, 'home']);
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
        Route::get('admin/books', [BooksController::class, 'index']);
        Route::post('admin/books/create', [BooksController::class, 'create'])->name('admin.books.create');
        Route::post('update-products', [ProductController::class, 'update']);
        Route::post('delete-products', [ProductController::class, 'delete']);
    }
);

// Route::get('admin/dashboard', [HomeController::class,'index'])->middleware(['auth','admin'])->name('admin.dashboard');
Route::get('customer/dashboard', [HomeController::class,'index'])->middleware(['auth','customer'])->name('customer.dashboard');
