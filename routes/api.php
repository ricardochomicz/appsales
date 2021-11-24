<?php

use App\Http\Controllers\Api\{
    CategoryController,
    ProductCategoryController,
    ProductController,
    ProductInputController,
    ProductOutputController,
    ProductPhotoController
};
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['as' => 'api.'], function () {
    Route::resource('categories', CategoryController::class, ['except' => ['create', 'edit']]);
    Route::patch('products/{product}/restore', [ProductController::class, 'restore']);
    Route::resource('products', ProductController::class, ['except' => ['create', 'edit']]);
    Route::resource('products.categories', ProductCategoryController::class, ['only' => ['index', 'store', 'destroy']]);
    Route::resource('products.photos', ProductPhotoController::class, ['except' => ['create', 'edit']]);
    Route::resource('inputs', ProductInputController::class, ['only' => ['index', 'store', 'show']]);
    Route::resource('outputs', ProductOutputController::class, ['only' => ['index', 'store', 'show']]);
});
