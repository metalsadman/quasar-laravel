<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Route::get('/', function () {
//    return view('welcome');
//});

// Redirect get requests (vue-router) to front-end view / generated public/index.html by quasar
Route::get('/{pattern?}', function () {
    return view('welcome');
})->where('pattern', '.*');
