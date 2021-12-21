<?php

use App\Http\Controllers\Api\{
    AuthController,
    CategoryController,
    ProductCategoryController,
    ProductController,
    ProductInputController,
    ProductOutputController,
    ProductPhotoController,
    UserController
};
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;




Route::group(['as' => 'api.'], function () {
    Route::name('login')->post('login', 'App\Http\Controllers\Api\AuthController@login');
    Route::name('refresh')->post('refresh', 'App\Http\Controllers\Api\AuthController@refresh');
    //auth:api refere-se ao guardiao da rota api
    Route::group(['middleware' => ['auth:api', 'jwt.refresh']], function () {
        Route::name('logout')->post('logout', 'App\Http\Controllers\Api\AuthController@logout');
        Route::name('me')->get('me', 'App\Http\Controllers\Api\AuthController@me');
        Route::resource('users', UserController::class, ['except' => ['create', 'edit']]);
        Route::resource('categories', CategoryController::class, ['except' => ['create', 'edit']]);
        Route::patch('products/{product}/restore', [ProductController::class, 'restore']);
        Route::resource('products', ProductController::class, ['except' => ['create', 'edit']]);
        Route::resource('products.categories', ProductCategoryController::class, ['only' => ['index', 'store', 'destroy']]);
        Route::resource('products.photos', ProductPhotoController::class, ['except' => ['create', 'edit']]);
        Route::resource('inputs', ProductInputController::class, ['only' => ['index', 'store', 'show']]);
        Route::resource('outputs', ProductOutputController::class, ['only' => ['index', 'store', 'show']]);
    });
});
