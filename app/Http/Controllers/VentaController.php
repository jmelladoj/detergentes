<?php

namespace App\Http\Controllers;

use App\DesgloceVenta;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use App\Venta;
use App\StockSucursal;
use App\DetalleVenta;
use App\DetallePago;
use App\Producto;
use App\Sucursal;

class VentaController extends Controller
{
    //
    public function index(Request $request, $inicio, $termino){
        if (!$request->ajax()) return redirect('/');

        $ventas = Venta::whereBetween('fecha', [$inicio, $termino])->where('estado', 2)->orderBy('id', 'DESC')->get();

        return [
            'ventas' => $ventas
        ];
    }

    public function index_facturas(Request $request, $inicio, $termino){
        if (!$request->ajax()) return redirect('/');

        $ventas = Venta::where('tipo_documento', 2)->whereBetween('fecha', [$inicio, $termino])->where('estado', 2)->orderBy('id', 'DESC')->get();

        return [
            'ventas' => $ventas
        ];
    }


    public function indexDetalleProductos (Request $request, $id, $inicio, $termino){
        if (!$request->ajax()) return redirect('/');


        $ventas = Venta::where('estado', 2)->whereBetween('fecha', [$inicio, $termino])->where('sucursal_id', $id)->orderBy('id', 'DESC')->with('detalle', 'pago')->get();

        return [
            'ventas' => $ventas
        ];
    }


    public function indexDetalle(Request $request, $id, $inicio, $termino){
        if (!$request->ajax()) return redirect('/');


        $ventas = Venta::where('estado', 2)->whereBetween('fecha', [$inicio, $termino])->where('sucursal_id', $id)->get();

        $efectivo = 0;
        $tarjeta_credito = 0;
        $tarjeta_debito = 0;
        $cheque = 0;
        $transferencia = 0;
        $total = 0;

        foreach($ventas as $venta){
            foreach($venta->pago as $detalle){
                switch ($detalle->medio_pago) {
                    case 1:
                        $efectivo += $detalle->monto_pago;
                        break;
                    case 2:
                        $tarjeta_credito += $detalle->monto_pago;
                        break;
                    case 3:
                        $tarjeta_debito += $detalle->monto_pago;
                        break;
                    case 4:
                        $cheque += $detalle->monto_pago;
                        break;
                    case 5:
                        $transferencia += $detalle->monto_pago;
                        break;
                }

                $total += $detalle->monto_pago;
            }
        }

        return [
            'efectivo' => $efectivo,
            'tarjeta_credito' => $tarjeta_credito,
            'tarjeta_debito' => $tarjeta_debito,
            'cheque' => $cheque,
            'transferencia' => $transferencia,
            'total' => $total
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

            $sucursal = Sucursal::find($request->sucursal_id);

            $venta = new Venta();
            $venta->subtotal = $request->subtotal;
            $venta->descuento = $request->descuento;
            $venta->total = $request->total;
            $venta->fecha = $fecha;
            $venta->tipo_documento = $request->tipo_documento;
            $venta->sucursal_id  = $request->sucursal_id;
            $venta->observacion  = $request->observacion;
            $venta->estado = $sucursal->stock_automatico == 1 ? 2 : 1;
            $venta->save();

            foreach ($request->detalle_venta AS $item) {
                $stock = 0;

                $stockSucursal = StockSucursal::where('sucursal_id', $request->sucursal_id)->where('producto_id', $item['producto_id'])->first();
                $stockSucursal->stock -= $item['cantidad'];
                $stockSucursal->save();

                $producto = Producto::find($item['producto_id']);
                $stock = $producto->stock;
                $producto->stock -= $item['cantidad'];
                $producto->save();

                DesgloceVenta::create([
                    'cantidad_venta' => $item['cantidad'],
                    'stock_nuevo' => $stock - $item['cantidad'],
                    'stock_antiguo' => $stock,
                    'venta_id' => $venta->id,
                    'producto_id' => $item['producto_id'],
                    'sucursal_id' => $request->sucursal_id
                ]);

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

    public function anular_venta(Request $request){
        $venta = Venta::find($request->id);
        $detalle = DetalleVenta::where('venta_id', $venta->id)->get();
        $pagos = DetallePago::where('venta_id', $venta->id)->get();

        foreach ($detalle AS $item) {
            $stock = 0;

            $stockSucursal = StockSucursal::where('sucursal_id', $venta->sucursal_id)->where('producto_id', $item->producto_id)->first();
            $stockSucursal->stock += $item->cantidad;
            $stockSucursal->save();

            $producto = Producto::find($item->producto_id);
            $stock = $producto->stock;
            $producto->stock += $item->cantidad;
            $producto->save();

            DesgloceVenta::create([
                'cantidad_venta' => $item['cantidad'],
                'stock_nuevo' => $stock + $item['cantidad'],
                'stock_antiguo' => $stock,
                'venta_id' => $venta->id,
                'producto_id' =>  $item->producto_id,
                'sucursal_id' => $venta->sucursal_id
            ]);
        }

        DetalleVenta::where('venta_id', $venta->id)->delete();
        DetallePago::where('venta_id', $venta->id)->delete();
        $venta->delete();
    }
}
