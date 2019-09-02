<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\StockSucursal;

class StockSucursalController extends Controller
{
    //

    
    public function index(Request $request){
        if (!$request->ajax()) return redirect('/');
        
        $stocks = StockSucursal::get();

        return [
            'stocks' => $stocks
        ];
    }

    public function obtenerStock(Request $request){
        if (!$request->ajax()) return redirect('/');
        
        $stocks = StockSucursal::where('producto_id', $request->producto_id)->with('sucursal')->get();

        return [
            'stocks' => $stocks
        ];
    }

    public function registrarStock(Request $request){
        
        foreach ($request->stock_sucursales AS $item) {
            StockSucursal::updateOrCreate(
                ['producto_id' => $item['producto_id'] , 'sucursal_id' => $item['sucursal_id']],
                ['stock' => $item['stock_sucursal']]
            );

        }
    }
}
