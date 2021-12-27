<?php

namespace App\Http\Controllers\Api;

use App\Common\OnlyTrashed;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    use OnlyTrashed;

    public function index(Request $request)
    {
        $query = Product::query();
        $query = $this->onlyTrashedIfRequest($request, $query);
        $products = Product::paginate(5);
        return ProductResource::collection($products);
    }


    public function store(ProductRequest $request)
    {
        $product = Product::creates($request->all());
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

    public function restore(Product $product)
    {
        $product->restore();
        return response()->json([], 204);
    }


    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json([], 204);
    }
}
