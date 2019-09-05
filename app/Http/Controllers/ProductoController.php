<?php

namespace App\Http\Controllers;

use App\LogStockRegistro;
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

    public function ingresoStockManual(Request $request){
        if (!$request->ajax()) return redirect('/');

        $detalle_stock = json_decode($request->detalle_stock);
        $total_stock = 0;

        foreach($detalle_stock AS $item){
            $stock = StockSucursal::firstOrNew(
                ['producto_id' => $request->producto_id , 'sucursal_id' =>  $item->sucursal_id]
            );

            if($request->accion == 1){
                $stock->stock += $item->stock;
            } else if($request->accion == 2){
                $stock->stock -= $item->stock;
            }
            
            $stock->save();

            $total_stock += $item->stock;
        }

        $producto = Producto::find($request->producto_id);

        if($request->accion == 1){
            $producto->stock += $total_stock;
        } else if($request->accion == 2){
            $producto->stock -= $total_stock;
        }

        $producto->save();

        if($request->accion == 1){
            LogStockRegistro::create(['mensaje' => \Auth::user()->name . ' ha ingresado ' . $total_stock . ' productos a ' . $producto->nombre]);
        } else if($request->accion == 2){
            LogStockRegistro::create(['mensaje' => \Auth::user()->name . ' ha quitado ' . $total_stock . ' productos a ' . $producto->nombre]);
        }
        
    }
}
