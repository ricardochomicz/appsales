<?php

namespace App\Providers;

use App\Models\{
    Category,
    Product,
    ProductInput,
    ProductOutput
};
use App\Observers\{
    CategoryObserver,
    ProductInputObserver,
    ProductObserver,
    ProductOutputObserver
};

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Category::observe(CategoryObserver::class);
        Product::observe(ProductObserver::class);
        ProductInput::observe(ProductInputObserver::class);
        ProductOutput::observe(ProductOutputObserver::class);
    }
}
