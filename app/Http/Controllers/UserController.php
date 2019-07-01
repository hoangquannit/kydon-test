<?php

namespace App\Http\Controllers;

use Sentinel;
class UserController extends Controller
{

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';


    public function __construct()
    {

    }

    /**
     * GET login action
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        // Success login
        $admin = Sentinel::getUser();
        return view('user.index', compact('admin'));
    }


}
