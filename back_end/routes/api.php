<?php

use App\Http\Controllers\Api\AuthorController;
use App\Http\Controllers\Api\BookController;
use App\Http\Controllers\Api\GenreController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\OrderDetailController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\UserController;

// Route::group(
//     ["middleware"=>['cors']], 
//     function () {

        //Register
        Route::post('register', [UserController::class, 'register']);

        //Login
        Route::post('login', [UserController::class, 'login']);

        Route::group(
            ["middleware" => ["auth:sanctum","admin"]], function () {
                Route::get('profile', [UserController::class, 'profile']);
                Route::get('logout', [UserController::class, 'logout']);
                Route::post('users', [UserController::class, 'index']);
                Route::put('update-user', [UserController::class, 'update']);
                Route::put('password-user', [UserController::class, 'updatePassword']);
                Route::delete('delete-user', [UserController::class, 'delete']);

                Route::post('books', [BookController::class, 'index']);
                Route::get('search', [BookController::class, 'search']);
                Route::post('create-book', [BookController::class, 'create']);
                Route::get('get-book', [BookController::class, 'get']);
                Route::get('get-book-author', [BookController::class, 'getByAuthor']);
                Route::get('get-book-genre', [BookController::class, 'getByGenre']);
                Route::put('update-book', [BookController::class, 'update']);
                Route::delete('delete-book', [BookController::class, 'delete']);
                
                Route::post('authors', [AuthorController::class, 'index']);
                Route::post('create-author', [AuthorController::class, 'create']);
                Route::get('get-author', [AuthorController::class, 'get']);
                Route::put('update-author', [AuthorController::class, 'update']);
                Route::delete('delete-author', [AuthorController::class, 'delete']);
                
                Route::post('genres', [GenreController::class, 'index']);
                Route::get('get-genre', [GenreController::class, 'get']);
                Route::post('create-genre', [GenreController::class, 'create']);
                Route::put('update-genre', [GenreController::class, 'update']);
                Route::delete('delete-genre', [GenreController::class, 'delete']);
                
                Route::post('reviews', [ReviewController::class, 'index']);
                Route::post('get-review-book', [ReviewController::class, 'getByBook']);
                Route::post('get-review-user', [ReviewController::class, 'getByUser']);
                Route::post('create-review', [ReviewController::class, 'create']);
                Route::put('update-review', [ReviewController::class, 'update']);
                Route::delete('delete-review', [ReviewController::class, 'delete']);
                
                Route::post('orders', [OrderController::class, 'index']);
                Route::get('get-order', [OrderController::class, 'get']);
                
                Route::post('order-details', [OrderDetailController::class, 'index']);
                Route::get('get-order-detail', [OrderDetailController::class, 'get']);
            }
        );
        Route::group(
            ["middleware" => ["auth:sanctum"]], function () {
                Route::get('profile', [UserController::class, 'profile']);
                Route::get('logout', [UserController::class, 'logout']);
                Route::put('update-user', [UserController::class, 'update']);
                Route::put('password-user', [UserController::class, 'updatePassword']);
                
                Route::post('products', [ProductController::class, 'index']);
                
                Route::post('books', [BookController::class, 'index']);
                Route::get('search', [BookController::class, 'search']);
                Route::get('get-book', [BookController::class, 'get']);
                Route::get('get-book-author', [BookController::class, 'getByAuthor']);
                Route::get('get-book-genre', [BookController::class, 'getByGenre']);

                Route::post('authors', [AuthorController::class, 'index']);
                Route::get('get-author', [AuthorController::class, 'get']);

                Route::post('genres', [GenreController::class, 'index']);
                Route::get('get-genre', [GenreController::class, 'get']);

                Route::post('reviews', [ReviewController::class, 'index']);
                Route::post('get-review-book', [ReviewController::class, 'getByBook']);
                Route::post('get-review-user', [ReviewController::class, 'getByUser']);
                Route::post('create-review', [ReviewController::class, 'create']);
                Route::put('update-review', [ReviewController::class, 'update']);

                Route::post('orders', [OrderController::class, 'index']);
                Route::get('get-order', [OrderController::class, 'get']);
                Route::post('checkout', [OrderController::class, 'checkout']);

                Route::post('order-details', [OrderDetailController::class, 'index']);
                Route::get('get-order-detail', [OrderDetailController::class, 'get']);
            }
        );
