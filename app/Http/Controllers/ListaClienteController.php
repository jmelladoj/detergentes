<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ListaCliente;

class ListaClienteController extends Controller
{
    //
    public function index(Request $request){
        if (!$request->ajax()) return redirect('/');
        
        $clientes = Cliente::orderBy('nombre', 'asc')->withTrashed()->get();

        return [
            'clientes' => $clientes
        ];
    }

    public function obtenerListaCliente(Request $request){
        if (!$request->ajax()) return redirect('/');
        
        $listaCliente = ListaCliente::where('cliente_id', $request->cliente_id)->with('producto')->get();

        return [
            'listaCliente' => $listaCliente
        ];
    }

    public function guardarListaCliente(Request $request)
    {
        if (!$request->ajax()) return redirect('/');

        ListaCliente::updateOrCreate(
            ['cliente_id' => $request->cliente_id, 'producto_id' => $request->producto_id],
            ['precio_neto' => $request->precio_neto, 'precio_normal' => $request->precio_normal, 'observacion' => $request->observacion]
        );
    }

    public function eliminarProductoListaCliente(Request $request){
        if (!$request->ajax()) return redirect('/');
        
        ListaCliente::find($request->id)->delete();
    }
}
