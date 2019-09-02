<?php

namespace App\Http\Controllers;

use App\LogStockRegistro;
use Illuminate\Http\Request;

class LogStockController extends Controller
{
    //
    public function index(Request $request){
        if (!$request->ajax()) return redirect('/');
        
        $logs = LogStockRegistro::orderBy('created_at', 'desc')->limit(100)->get();

        return [
            'logs' => $logs
        ];
    }

}
