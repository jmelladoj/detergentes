<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Sucursal;
use App\StockSucursal;
use App\Producto;

class SucursalController extends Controller
{
    //
    public function index(Request $request){
        if (!$request->ajax()) return redirect('/');
        
        $sucursales = Sucursal::orderBy('nombre', 'asc')->get();

        return [
            'sucursales' => $sucursales
        ];
    }

    public function guardarSucursal(Request $request)
    {
        if (!$request->ajax()) return redirect('/');

        $sucursal = new Sucursal();
        $sucursal->nombre = $request->nombre;
        $sucursal->direccion = $request->direccion;
        $sucursal->stock_automatico = $request->stock_automatico;
        $sucursal->save();

        $productos = Producto::withTrashed()->get();

        foreach ($productos as $producto) {
            StockSucursal::create(['producto_id' => $producto->id, 'sucursal_id' => $sucursal->id, 'stock' => 0]);
        }
    }

    public function actualizarSucursal(Request $request)
    {
        if (!$request->ajax()) return redirect('/');

        $sucursal = Sucursal::findOrFail($request->sucursal_id);
        $sucursal->nombre = $request->nombre;
        $sucursal->direccion = $request->direccion;
        $sucursal->stock_automatico = $request->stock_automatico;
        $sucursal->save();
    }

    public function eliminarSucursal(Request $request){
        if (!$request->ajax()) return redirect('/');
        
        $sucursal = Sucursal::findOrFail($request->id);
        $sucursal->productos()->delete();
        $sucursal->delete(); 
    }
}
