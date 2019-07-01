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

Route::group([
    'namespace' => 'Auth',
    'middleware' => ['web']
],
    function () {
        // Login screen
        Route::get('login', ['as' => ADMIN_LOGIN, 'uses' => 'LoginController@create']);
        Route::get('logout', ['as' => ADMIN_LOGOUT, 'uses' => 'LoginController@destroy']);
        Route::resource('login', 'LoginController', ['only' => ['create', 'store', 'destroy']]);

        //Social Login
        Route::get('login/{provider}', ['as' => 'socialLogin', 'uses' => 'LoginController@redirectToProvider']);
        Route::get('login/{provider}/callback', 'LoginController@handleProviderCallback');

        //Register Account
        Route::get('/account', ['as' => 'register', 'uses' => 'LoginController@register']);
        Route::post('/account/create', ['as' => 'createAccount', 'uses' => 'LoginController@createAccount']);


    }
);

Route::group(
    [
        'middleware' => ['auth', 'web'],
    ],
    function () {
        // Top page
        Route::get('/user', ['as' => 'index', 'uses' => 'UserController@index']);
    }
);
