<?php

use App\Http\Controllers\Api\{
    CategoryController,
    ProductController
};
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['as' => 'api.'], function () {
    Route::resource('categories', CategoryController::class, ['except' => ['create', 'edit']]);
    Route::resource('products', ProductController::class, ['except' => ['create', 'edit']]);
});
