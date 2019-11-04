<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Producto;
use App\Documento;
use App\Empresa;
use Carbon\Carbon;
use App\DetalleDocumento;
use PDF;
use App\Mail\cotizacion;
use Illuminate\Support\Facades\Mail;
use App\Mail\ordenDeCompra;

class DocumentoController extends Controller
{
    //
    public function index(Request $request, $tipo){
        if (!$request->ajax()) return redirect('/');
        
        $documentos = Documento::where('tipo', $tipo)->withTrashed()->with('empresa', 'encargado')->orderBy('created_at', 'DESC')->get();

        return [
            'documentos' => $documentos
        ];
    }

    public function guardarDocumento(Request $request)
    {
        if (!$request->ajax()) return redirect('/');

        try{
            DB::beginTransaction();
            

            $observacion = 'Sin observaciones';

            if($request->observacion != null){
                $observacion = $request->observacion;
            }


            $empresa = Empresa::updateOrCreate(
                ['rut' => $request->rut],
                [
                    'nombre' => $request->nombre,
                    'giro' => $request->giro ,
                    'telefono' => $request->telefono, 
                    'direccion' => $request->direccion,
                    'comuna' => $request->comuna,
                    'correo' => $request->correo,
                    'empresa' => 1,
                    'observacion' => $observacion
                ]
            );

            $documento = Documento::create([
                'empresa_id' => $empresa->id,
                'subtotal' => $request->neto,
                'total' => $request->total,
                'tipo' => $request->tipo,
                'fecha' => Carbon::now()->format('Y-m-d'),
                'user_id' => \Auth::user()->id
            ]);

            for ($i=0; $i < count($request->detalle); $i++) { 
                DetalleDocumento::create([
                    'documento_id' => $documento->id,
                    'producto' => $request->detalle[$i],
                    'cantidad' => $request->cantidad[$i],
                    'unidad' => $request->unidad[$i],
                    'valor' => $request->valor[$i],
                ]);                
            }

            DB::commit();
        } catch (Exception $e){
            DB::rollBack();
        }
    }

    public function verDetalle(Request $request, $id){
        if (!$request->ajax()) return redirect('/');
        
        $detalle_documento = DetalleDocumento::where('documento_id', $id)->orderBy('created_at', 'ASC')->get();

        return [
            'detalle_documento' => $detalle_documento
        ];
    }

    public function eliminarDocumento(Request $request){
        if (!$request->ajax()) return redirect('/');
        
        Documento::findOrFail($request->id)->delete();
    }

    public function restaurarDocumento(Request $request){
        if (!$request->ajax()) return redirect('/');
        
        Documento::withTrashed()->find($request->id)->restore();
    }

    public function descargarCotizacion($id)
    {  
        $documento = Documento::find($id);
        $detalle_documento = DetalleDocumento::where('documento_id', $id)->orderBy('created_at', 'ASC')->get();

        $valido = new Carbon($documento->fecha);

        $data = ['documento' => $documento,
                 'detalle_documento' => $detalle_documento,
                 'valido' => $valido->addDay(10)->format('Y-m-d')];

        $pdf = PDF::loadView('pdf/cotizacion', $data);
        return $pdf->output();

    }

    public function descargarOrdenCompra($id)
    {  
        $documento = Documento::find($id);
        $detalle_documento = DetalleDocumento::where('documento_id', $id)->orderBy('created_at', 'ASC')->get();

        $valido = new Carbon($documento->fecha);

        $data = ['documento' => $documento,
                 'detalle_documento' => $detalle_documento,
                 'valido' => $valido->addDay(10)->format('Y-m-d')];

        $pdf = PDF::loadView('pdf/ordenCompra', $data);
        return $pdf->output();

    }

    public function enviarCotizacion($id)
    {  
        $documento = Documento::find($id);
        $detalle_documento = DetalleDocumento::where('documento_id', $id)->orderBy('created_at', 'ASC')->get();
        $valido = new Carbon($documento->fecha);
        $valido = $valido->addDay(10)->format('Y-m-d');

        Mail::to($documento->empresa->correo)->send(new cotizacion($documento, $detalle_documento, $valido));
    }

    public function enviarOrdenDeCompra($id)
    {  
        $documento = Documento::find($id);
        $detalle_documento = DetalleDocumento::where('documento_id', $id)->orderBy('created_at', 'ASC')->get();

        Mail::to($documento->empresa->correo)->send(new ordenDeCompra($documento, $detalle_documento));
    }

    public function confirmar(Request $request){
        $detalle_documento = DetalleDocumento::find($request->id);
        $producto = Producto::where('nombre', $detalle_documento->producto)->first();

        switch ($request->accion) {
            case 1:
                $producto->stock += $detalle_documento->cantidad;
                $detalle_documento->confirmado = 1;
                break;
            case 2:
                $producto->stock -= $detalle_documento->cantidad;
                $detalle_documento->confirmado = 0;
                break;
        }

        $producto->save();
        $detalle_documento->save();
    }
}
