<?php

// **No need for App\Http\Middleware\CorsMiddleware** (removed)
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Spatie\Cors\Cors\Cors;  // Import the Spatie CORS middleware

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(
        function (Middleware $middleware) {
            // $middleware->use([Cors::class]);  // Use the Spatie CORS middleware
            $middleware->alias(
                [
                    'admin' => \App\Http\Middleware\Admin::class, // Assuming your admin middleware exists
                ]
            );
        }
    )
    ->withExceptions(
        function (Exceptions $exceptions) {
            // ... (Your exception handling logic)
        }
    )
    ->create();
