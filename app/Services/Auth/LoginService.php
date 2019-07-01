<?php

namespace App\Services\Auth;

use App\Packages\AdminAuth\Checkpoints\NotActivatedException;
use App\Packages\AdminAuth\Eloquent\EloquentUser;
use Sentinel;
use DB;

class LoginService
{
    /**
     * @param $credentials
     * @param bool $remember
     * @return array
     */
    public function loginProcess($credentials, $remember = false)
    {
        $user = Sentinel::findByCredentials($credentials);
        try {
            if (Sentinel::authenticate($credentials, $remember)) {
                return [
                    'success' => true,
                    'message' => 'Login succeed'
                ];
            }

        } catch (NotActivatedException $e) {
            return [
                'success' => false,
                'message' => trans('account lock')
            ];
        } catch (\Cartalyst\Sentinel\Checkpoints\ThrottlingException $e) {
            return [
                'success' => false,
                'message' => trans('account lock')
            ];
        }
        return [
            'success' => false,
            'message' => trans('login invalid credentials provided')
        ];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @return array
     */
    public function logoutProcess($id=null)
    {
        try {
            if ($id) {
                $user = Sentinel::findById($id);
                Sentinel::logout($user);
            } else {
                Sentinel::logout();
            }

            return [
                'success' => true,
                'message' => 'Logout succeed'
            ];

        } catch (NotActivatedException $e) {
            Log::error('Logout error: ' . $e->getMessage());
            return [
                'success' => false,
                'message' => 'Logout error'
            ];
        }
    }

    /**
     * @param $request
     * @return array
     */
    public function createAccount($request)
    {
        $credentials = [
            'email' => $request->get('email'),
            'password' => $request->get('password')
        ];

        try {
            $user = Sentinel::registerAndActivate($credentials);
            return [
                'success' => true,
                'message' => 'create success'
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => trans('create fail')
            ];
        }

    }

}