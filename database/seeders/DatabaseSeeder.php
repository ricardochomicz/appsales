<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        Category::factory(5)->create();
        $categories = Category::all();
        Product::factory(30)->create()
            ->each(function (Product $product) use ($categories) {
                $categoryId = $categories->random()->id;
                $product->categories()->attach($categoryId);
            });
    }
}
