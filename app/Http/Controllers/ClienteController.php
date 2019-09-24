<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Cliente;
use App\ListaCliente;

class ClienteController extends Controller
{
    //
    public function index(Request $request){
        if (!$request->ajax()) return redirect('/');
        
        $clientes = Cliente::orderBy('nombre', 'asc')->withTrashed()->get();

        return [
            'clientes' => $clientes
        ];
    }

    public function indexVenta(Request $request, $id){
        if (!$request->ajax()) return redirect('/');
        
        $lista = ListaCliente::where('cliente_id', $id)->get();

        return [
            'lista' => $lista
        ];
    }

    public function guardarCliente(Request $request)
    {
        if (!$request->ajax()) return redirect('/');

        $cliente = new Cliente();
        $cliente->run = $request->run;
        $cliente->nombre = $request->nombre;
        $cliente->direccion = $request->direccion;
        $cliente->telefono = $request->telefono;
        $cliente->save();

    }

    public function actualizarCliente(Request $request)
    {
        if (!$request->ajax()) return redirect('/');

        $cliente = Cliente::findOrFail($request->cliente_id);
        $cliente->run = $request->run;
        $cliente->nombre = $request->nombre;
        $cliente->direccion = $request->direccion;
        $cliente->telefono = $request->telefono;
        $cliente->save();
    }

    public function eliminarCliente(Request $request){
        if (!$request->ajax()) return redirect('/');
        
        Cliente::findOrFail($request->id)->delete();
    }

    public function restaurarCliente(Request $request){
        if (!$request->ajax()) return redirect('/');
        
        Cliente::withTrashed()->find($request->id)->restore();
    }
}
