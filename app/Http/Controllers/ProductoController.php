<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Producto;
use App\Sucursal;
use App\StockSucursal;

class ProductoController extends Controller
{
    //
    public function index(Request $request){
        if (!$request->ajax()) return redirect('/');
        
        $productos = Producto::orderBy('nombre', 'asc')->get();

        return [
            'productos' => $productos
        ];
    }

    public function indexActivos(Request $request){
        if (!$request->ajax()) return redirect('/');
        
        $productos = Producto::orderBy('nombre', 'asc')->get();

        return [
            'productos' => $productos
        ];
    }

    public function indexCriticos(Request $request){
        if (!$request->ajax()) return redirect('/');
        
        $productos = Producto::where('stock', '<=', 'stock_critico')->orderBy('nombre', 'asc')->get();

        return [
            'productos' => $productos
        ];
    }

    public function indexStock(Request $request){
        if (!$request->ajax()) return redirect('/');
        
        $productos = Producto::orderBy('nombre', 'asc')->get();

        return [
            'productos' => $productos
        ];
    }

    public function guardarProducto(Request $request)
    {
        if (!$request->ajax()) return redirect('/');

        $producto = new Producto();
        $producto->nombre = $request->nombre;
        $producto->codigo = $request->codigo;
        $producto->precio_costo = $request->precio_costo;
        $producto->precio_normal = $request->precio_normal;
        $producto->precio_mayorista = $request->precio_mayorista;
        $producto->stock = $request->stock;
        $producto->stock_critico = $request->stock_critico;
        $producto->cantidad_mayorista = $request->cantidad_mayorista;
        $producto->sub_categoria_id = $request->sub_categoria_id;
        $producto->save();     

        $sucursales =  Sucursal::withTrashed()->get();

        foreach ($sucursales as $sucursal) {
            StockSucursal::create(['producto_id' => $producto->id, 'sucursal_id' => $sucursal->id, 'stock' => 0]);
        }
    }

    public function actualizarProducto(Request $request)
    {
        if (!$request->ajax()) return redirect('/');

        $producto = Producto::findOrFail($request->producto_id);
        $producto->nombre = $request->nombre;
        $producto->codigo = $request->codigo;
        $producto->precio_costo = $request->precio_costo;
        $producto->precio_normal = $request->precio_normal;
        $producto->precio_mayorista = $request->precio_mayorista;
        $producto->stock = $request->stock;
        $producto->stock_critico = $request->stock_critico;
        $producto->cantidad_mayorista = $request->cantidad_mayorista;
        $producto->sub_categoria_id = $request->sub_categoria_id;
        $producto->save();
    }

    public function eliminarProducto(Request $request){
        if (!$request->ajax()) return redirect('/');
        
        Producto::findOrFail($request->id)->delete();
    }

    public function restaurarProducto(Request $request){
        if (!$request->ajax()) return redirect('/');
        
        Producto::withTrashed()->find($request->id)->restore();
    }
}
