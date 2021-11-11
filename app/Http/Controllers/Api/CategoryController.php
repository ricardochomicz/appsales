<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    
    public function index()
    {
        return Category::all();     
    }

    
    public function store(CategoryRequest $request)
    {
        $category = Category::create($request->all());
        $category->refresh();
        return $category;
    }

    
    public function show(Category $category)
    {
        return new CategoryResource($category);
    }

    
    public function update(CategoryRequest $request, Category $category)
    {
        $category->update($request->all());
        return $category;
    }

   
    public function destroy(Category $category)
    {
        $category->delete();
        return response()->json([], 204);
    }
}
