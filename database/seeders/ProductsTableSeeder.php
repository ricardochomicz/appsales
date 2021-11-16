<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = Category::all();
        Product::factory()->create()
            ->each(function(Product $product)use($categories){
                $categoryId = $categories->random()->id;
                $product->categories()->attach($categoryId);
            });
    }
}
