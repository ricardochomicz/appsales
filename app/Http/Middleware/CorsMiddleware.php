<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CorsMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if ($request->is('api/*')) {
            header('Access-Control-Allow-Origin: http://localhost:4200');
            header('Access-Control-Allow-Headers: Content-Type');
            // header('');
        }
        return $next($request);
    }
}
