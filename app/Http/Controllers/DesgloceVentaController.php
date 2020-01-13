<?php

namespace App\Http\Controllers;

use App\DesgloceVenta;
use Illuminate\Http\Request;

class DesgloceVentaController extends Controller
{
    //
    public function index(){
        return ['desgloce' => DesgloceVenta::orderBy('created_at', 'desc')->take(1500)->get()];
    }
}
