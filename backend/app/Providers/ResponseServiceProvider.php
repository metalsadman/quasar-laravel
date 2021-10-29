<?php
namespace App\Providers;

use Illuminate\Routing\ResponseFactory;
use Illuminate\Support\ServiceProvider;

class ResponseServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot(ResponseFactory $factory)
    {
        $factory->macro('success', function ($message = null, $data = null, $code = null) use ($factory) {
            $format = [
                'status' => 1,
                'message' => $message,
                'data' => $data,
            ];
            if ($data != null) {
                $format['data'] = $data;
            }

            return $code ? $factory->make($format, $code) : $factory->make($format);

        });

        $factory->macro('error', function ($message = null, $data = null, $code = null) use ($factory) {
            $format = [
                'status' => 0,
                'message' => $message,
            ];
            if ($data != null) {
                $format['data'] = $data;
            }

            return $code ? $factory->make($format, $code) : $factory->make($format);
        });
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
