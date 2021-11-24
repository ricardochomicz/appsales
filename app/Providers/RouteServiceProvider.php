<?php

namespace App\Providers;

use App\Models\{
    Category,
    Product
};
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * The path to the "home" route for your application.
     *
     * This is used by Laravel authentication to redirect users after login.
     *
     * @var string
     */
    public const HOME = '/home';

    /**
     * The controller namespace for the application.
     *
     * When present, controller route declarations will automatically be prefixed with this namespace.
     *
     * @var string|null
     */
    // protected $namespace = 'App\\Http\\Controllers';

    /**
     * Define your route model bindings, pattern filters, etc.
     *
     * @return void
     */
    public function boot()
    {
        $this->configureRateLimiting();

        $this->routes(function () {
            Route::prefix('api')
                ->middleware('api')
                ->namespace($this->namespace)
                ->group(base_path('routes/api.php'));

            Route::middleware('web')
                ->namespace($this->namespace)
                ->group(base_path('routes/web.php'));
        });

        Route::bind('category', function ($value) {
            //route model binding
            //search id or slug
            /** @var Collection $collection */
            $collection = Category::whereId($value)->orWhere('slug', $value)->get();
            return $collection->first();
        });

        Route::bind('product', function ($value) {
            /** @var Collection $collection */
            $query = Product::query();
            $query = $this->onlyTrashedIfRequest($query);
            $collection = $query->whereId($value)->orWhere('slug', $value)->get();
            return $collection->first();
        });
    }

    //busca somente os registros excluidos
    private function onlyTrashedIfRequest(Builder $query)
    {
        if (\Request::get('trashed') == 1) {
            $query = $query->onlyTrashed();
        }
        return $query;
    }

    /**
     * Configure the rate limiters for the application.
     *
     * @return void
     */
    protected function configureRateLimiting()
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by(optional($request->user())->id ?: $request->ip());
        });
    }
}
