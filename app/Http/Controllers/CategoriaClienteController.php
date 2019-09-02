<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\CategoriaCliente;

class CategoriaClienteController extends Controller
{
    //
    public function index(Request $request){
        if (!$request->ajax()) return redirect('/');
        
        $categoriasClientes = CategoriaCliente::orderBy('nombre', 'asc')->get();

        return [
            'categoriasClientes' => $categoriasClientes
        ];
    }

    public function guardarCategoriaCliente(Request $request)
    {
        if (!$request->ajax()) return redirect('/');

        $categoriaCliente = new CategoriaCliente();
        $categoriaCliente->nombre = $request->nombre;
        $categoriaCliente->minimo = $request->minimo;
        $categoriaCliente->maximo = $request->maximo;
        $categoriaCliente->save();
    }

    public function actualizarCategoriaCliente(Request $request)
    {
        if (!$request->ajax()) return redirect('/');

        $categoriaCliente = CategoriaCliente::findOrFail($request->categoria_cliente_id);
        $categoriaCliente->nombre = $request->nombre;
        $categoriaCliente->minimo = $request->minimo;
        $categoriaCliente->maximo = $request->maximo;
        $categoriaCliente->save();
    }

    public function eliminarCategoriaCliente(Request $request){
        if (!$request->ajax()) return redirect('/');
        
        $categoriaCliente = CategoriaCliente::findOrFail($request->categoria_cliente_id);
        $categoriaCliente->delete(); 
    }

}
