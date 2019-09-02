<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use App\Venta;
use App\StockSucursal;
use App\DetalleVenta;
use App\DetallePago;
use App\Producto;

class VentaController extends Controller
{
    //
    public function index(Request $request){
        if (!$request->ajax()) return redirect('/');
        
        $ventas = Venta::orderBy('id', 'DESC')->get();

        return [
            'ventas' => $ventas
        ];
    }

    public function pendientes(Request $request){
        if (!$request->ajax()) return redirect('/');
        
        $ventas = Venta::where('estado', 1)->orderBy('id', 'DESC')->with('detalle')->get();

        return [
            'ventas' => $ventas
        ];
    }


    public function registrarVenta(Request $request){
        if (!$request->ajax()) return redirect('/');

        try{
            DB::beginTransaction();

            $fecha = Carbon::now();

            $venta = new Venta();
            $venta->subtotal = $request->subtotal;
            $venta->descuento = $request->descuento;
            $venta->total = $request->total;
            $venta->fecha = $fecha;
            $venta->tipo_documento = 0;
            $venta->sucursal_id  = $request->sucursal_id;
            $venta->observacion  = $request->observacion;
            $venta->save();
            
            foreach ($request->detalle_venta AS $item) {               
                $stockSucursal = StockSucursal::where('sucursal_id', $request->sucursal_id)->where('producto_id', $item['producto_id'])->first();
                $stockSucursal->stock -= $item['cantidad'];
                $stockSucursal->save();
                
                $producto = Producto::find($item['producto_id']);
                $producto->stock -= $item['cantidad'];
                $producto->save();

                DetalleVenta::create(['venta_id' => $venta->id, 'producto_id' => $item['producto_id'], 'cantidad' => $item['cantidad']]);
            }

            foreach ($request->detalle_pago AS $item) {
                DetallePago::create(['venta_id' => $venta->id, 'monto_pago' => $item['monto_pago'] , 'medio_pago' => $item['medio_pago'], 'numero_documento' => $item['numero_documento']]);
            }

            DB::commit();
        } catch (Exception $e){
            DB::rollBack();
        }
    }

    public function entregar(Request $request){
        $venta = Venta::find($request->id);
        $venta->estado = 2;
        $venta->save();
    }
}
