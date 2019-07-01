<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AccountRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email' => 'required|email|max:200',
            'password' => 'required|min:8|max:32|
                                |regex:/^.*(?=.{3,})(?=.*[a-z])(?=.*[0-9]).*$/'
        ];
    }

    public function messages()
    {
        return [
            'password.required' => 'password required',
            'password.min' => trans('custom_validation.password.min'),
            'password.max' => trans('custom_validation.password.max'),
            'password.regex' => trans('custom_validation.password.regex'),
            'email.required' => trans('custom_validation.email.required'),
            'email.email' => trans('custom_validation.email.email_ja'),
            'email.max' => trans('custom_validation.email.max'),
            'email.unique' => trans('custom_validation.email.unique'),
        ];
    }
}
