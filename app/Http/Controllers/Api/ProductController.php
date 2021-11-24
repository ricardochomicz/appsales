<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;

class ProductController extends Controller
{
   
    public function index()
    {
        $products = Product::paginate();
        return ProductResource::collection($products);
    }

    
    public function store(ProductRequest $request)
    {
        $product = Product::create($request->all());
        $product->refresh();
        return new ProductResource($product);
    }

    
    public function show(Product $product)
    {
        return new ProductResource($product);
    }

    
    public function update(ProductRequest $request, Product $product)
    {
        $product->update($request->all());
        return new ProductResource($product);
    }

   
    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json([], 204);
    }

}
