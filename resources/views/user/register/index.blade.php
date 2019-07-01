<div class="register-form">
    {!! Form::open(['route' => 'createAccount', 'class'=>'form-login']) !!}
    <input type="hidden" name="_token" value="{{ csrf_token() }}">
    <div id="message-form" class="message-form message-register"></div>

    <div class="form-group">

        {!!
            Form::text(
                'email',
                old('account.email'),
                [
                    'placeholder' => trans('email'),
                    'class' => 'input-text email-value',
                    'id' => 'email-error',
                    'data-rule-required'=>'true',
                    'data-msg-required' => trans('email required'),
                    'data-msg-email' => trans('format email valid'),
                ]
            )
        !!}
        @if (count($errors) > 0)
            @if ($errors->first('email') != '')

                <div class="message-form message-login sv-error" style="display:block">
                    {{$errors->first('email')}}
                </div>

            @endif
        @endif
        @if (count($errors) > 0)
            @if ($errors->first('message') != '')
                <div class="message-form message-login sv-errors" style="display:block">
                    {{$errors->first('message')}}
                </div>
            @endif
        @endif
        <label id="email-error-error" class="input-error" style="display: none" for="email-error">{{trans('views/users.error_email')}}</label>
    </div>

    <div class="form-group">
        {{
            Form::password(
                'password',
                [
                    'placeholder' => trans('password'),
                    'class' =>  'input-text password-value',
                    'data-rule-required' => 'true',
                    'data-msg-required' => trans('password required'),
                ]
            )
        }}
        @if (count($errors) > 0)
            @if ($errors->first('password') != '')

                <div class="message-form message-login sv-error" style="display:block">
                    {{$errors->first('password')}}
                </div>

            @endif
        @endif

        <label id="password-error" style="display: none" class="input-error" for="password">{{trans('views/users.error_password')}}</label>
    </div>

    {!!
        Form::submit(
            trans('Register'),
            [
                'id' => 'loginButton',
                'class' => 'input-submit createAccount',
            ]
        )
    !!}
    {!! Form::close() !!}
    <div class="signin-title"><span> {{trans('Social login')}}</span></div>
    <div class="signin-social">
        <a href="{{ route('socialLogin', ['provider' => 'facebook', 'type' => 'login']) }}" title="{{trans('views/user_register.btn_fb_create')}}" class="signin-facebook">{{trans('facebook login')}}</a>
        <a href="{{ route('socialLogin', ['provider' => 'google', 'type' => 'login']) }}" title="{{trans('views/user_register.btn_gg_create')}}" class="signin-google">{{trans('google login')}}</a>
        <div class="signin-title">&nbsp;</div>
    </div>

</div>