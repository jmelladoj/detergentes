@extends('layouts.app')

@section('content')
    <section id="wrapper">
        <div class="login-register" style="background-image:url(../assets/images/background/login-register.jpg);">
            <div class="login-box card">
                @if($errors->any())
                    <div class="alert alert-danger">
                        <center>
                            @foreach($errors->all() as $error)
                                {{ $error }}
                            @endforeach
                        </center>
                    </div>
                @endif

                <div class="card-body">
                    <form class="form-horizontal form-material" id="loginform" action="{{ route('login') }}" method="POST">
                        @csrf
                        <h3 class="box-title m-b-20">Login</h3>
                        <div class="form-group ">
                            <div class="col-xs-12">
                                <input class="form-control" id="email" name="email" type="text" required="" placeholder="Usuario"> </div>
                        </div>
                        <div class="form-group">
                            <div class="col-xs-12">
                                <input class="form-control" id="password" name="password" type="password" required="" placeholder="Password"> </div>
                        </div>
                        <div class="form-group text-center">
                            <div class="col-xs-12 p-b-20">
                                <button class="btn btn-block btn-lg btn-info btn-rounded" type="submit">{{ __('Ingresar') }}</button>
                            </div>
                        </div>
                    </form>
                </div>
                
            </div>
        </div>
    </section>
@endsection

