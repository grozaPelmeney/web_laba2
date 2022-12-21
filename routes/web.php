<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/



$router->get('/item_car',"ShowController@itemCar");
$router->get('/show_car',"ShowController@showCar");
$router->get('/show_feature',"ShowController@showFeature");
$router->get('/show_base',"ShowController@showBase");

$router->post('/update_car',"UpdateController@updateCar");


$router->post('/create_car',"CreateController@createCar");
$router->post('/create_feature',"CreateController@createFeature");
$router->post('/create_base',"CreateController@createBase");

$router->delete('/delete_car',"DeleteController@deleteCar");

$router->post('/register',"LoginController@registr");
$router->post('/login',"LoginController@login");


//pages ,['middleware' => ['auth']
$router->get('/admin', function () use ($router) {
    return view('pages/admin');
});

$router->get('/item/{id}', function () use ($router) {
    return view('pages/item');
});
$router->get('/list', function () use ($router) {
    return view('pages/list');
});
$router->get('/redact/{id}', function () use ($router) {
    return view('pages/redact');
});

$router->get('/', function () use ($router) {
    return view('pages/login');
});

$router->get('/register', function () use ($router) {
    return view('pages/register');
});