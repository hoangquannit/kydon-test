<!DOCTYPE html>
<html lang="{{ session('locale', 'ja') }}">

<head>
    <meta charset="utf-8">
    <title>{{ __('Login') }}</title>
    <meta name="description" content="">
    <meta name="keywords" content="">
    <meta property="og:title" content="{{ __('view/account.login_title') }}">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="shortcut icon" href="{{URL::asset('theme/img/favicon.png')}}">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <link rel="apple-touch-icon" sizes="57x57" href="{{ URL::asset('theme/img/apple-touch-icon.png')}}">
    <link rel="apple-touch-icon" sizes="72x72" href="{{ URL::asset('theme/img/apple-touch-icon-72x72.png') }}">
    <link rel="apple-touch-icon" sizes="114x114" href="{{ URL::asset('theme/img/apple-touch-icon-114x114.png') }}">

    <!-- Style - Libs -->
    {!! Html::style('theme/css/style.css') !!}
    {!! Html::style('theme/css/font-awesome.min.css') !!}

    <![endif]-->
</head>
<body>
<div class="wrapper">
    <div class="main-content-login">
        <div class="form-login text-center">
            <h3 class="form-login-heading">User Login</h3>
            <p class="form-login-description form-login-error"></p>
            <p class="form-login-description form-login-error-sv">
                {!! Helper::errorsFor('authen', $errors) !!}
                {!! Helper::errorsFor('email', $errors) !!}
                {!! Helper::errorsFor('password', $errors) !!}
            </p>
            <div class="form-login-content">
                {!! Form::open(['url' => route(ADMIN_LOGIN), 'method' => 'POST', 'id' => 'form-login']) !!}
                {{ csrf_field() }}
                    {!! Form::text('email', old('email'), ['placeholder' => __('view/account.login_email_placeholder'), 'class' => 'input-text input-text-large' ]) !!}
                    {!! Form::password('password',  ['placeholder' => __('view/account.login_pw_placeholder'), 'class' => 'input-text input-text-large' ]) !!}
                    {!!  Form::submit(__('Login'), ['class' => 'button button-large button-black button-block form-login-submit']) !!}
                    <a href="{{ route('register') }}" class="form-login-remember">{{ __('Sign Up')}}</a>
                {!! Form::close() !!}
            </div>
        </div>
    </div>
    <footer class="main-footer">
        <div class="container">
        </div>
    </footer>
</div>
{!! Html::script('theme/js/vendor/jquery.min.js') !!}
{!! Html::script('theme/js/login.js') !!}
{!! Html::script('theme/js/vendor/jquery.validate.min.js') !!}
{!! Html::script('theme/js/vendor/jquery.matchHeight.min.js') !!}
{!! Html::script('theme/js/vendor/jquery.slimscroll.min.js') !!}
{!! Html::script('theme/js/main.js?v='. config('app.version')) !!}
</body>
</html>