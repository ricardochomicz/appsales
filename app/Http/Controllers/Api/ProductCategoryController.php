<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductCategoryRequest;
use App\Http\Resources\ProductCategoryResource;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductCategoryController extends Controller
{

    public function index(Product $product)
    {
        return new ProductCategoryResource($product);
    }


    public function store(ProductCategoryRequest $request, Product $product)
    {
        //recebe array de categorias e faz um sync em vez do attach
        $changed = $product->categories()->sync($request->categories);
        //retorna os ids incluidos attach
        $categoriesAttachedId = $changed['attached'];
        // WHERE id IN (1,3) compara e retorna as categorias incluidas
        $categories = Category::whereIn('id', $categoriesAttachedId)->get();
        //realiza a serialização forçada status 201
        //retorna 201 se tiver categorias adicionadas, senão retorna o array vazio
        return $categories->count() ? response()->json(new ProductCategoryResource($product), 201) : [];
    }


    public function destroy(Product $product, Category $category)
    {
        $product->categories()->detach($category->id);
        return response()->json([], 204);
    }
}
