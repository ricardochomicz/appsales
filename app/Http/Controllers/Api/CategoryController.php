<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{

    public function index(Request $request)
    {
        //se tiver all na requisição traz todos os registros, caso contrario faz a paginação
        $categories = $request->has('all') ? Category::all() : Category::orderBy('name', 'asc')->paginate(5);
        return CategoryResource::collection($categories);
    }


    public function store(CategoryRequest $request)
    {
        $category = Category::create($request->all());
        $category->refresh();
        return new CategoryResource($category);
    }


    public function show(Category $category)
    {
        return new CategoryResource($category);
    }


    public function update(CategoryRequest $request, Category $category)
    {
        $category->update($request->all());
        return new CategoryResource($category);
    }


    public function destroy(Category $category)
    {
        $category->delete();
        return response()->json([], 204);
    }
}
