<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\AccountRequest;
use App\Http\Requests\Auth\LoginFormRequest;
use App\Services\Auth\LoginService;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Sentinel;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * LoginController constructor.
     * @param LoginService $loginService
     */
    public function __construct(LoginService $loginService)
    {
        $this->loginService = $loginService;
    }

    /**
     * GET login action
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        return view('user.auth.login');
    }


    public function store(LoginFormRequest $request)
    {
        $credentials = $request->only('email', 'password');
        $remember = $request->has('remember');

        $response = $this->loginService->loginProcess($credentials, $remember );
        if (!array_get($response, 'success')) {
            return redirect()
                ->back()
                ->withInput()
                ->withErrors(['authen' => array_get($response, 'message')]);
        }
        // Success login

        return redirect()->route('index');

    }

    public function register()
    {
        return view('user.register.index');
    }

    /**
     * Create Account By Email and Password
     *
     * @param  AccountRequest $request $request
     *
     * @return String Message create success or fail
     */
    public function createAccount(AccountRequest $request)
    {
        $account = $this->loginService->createAccount($request);

        if (array_get($account,'success')) {
            return redirect()->to(route(ADMIN_LOGIN));
        }
        return redirect()->route('register')->withInput()->withErrors(['message' => $account['message']]);
    }

}
