<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Categoria;

class CategoriaController extends Controller
{
    //
    public function index(Request $request){
        if (!$request->ajax()) return redirect('/');
        
        $categorias = Categoria::orderBy('nombre', 'asc')->withTrashed()->get();

        return [
            'categorias' => $categorias
        ];
    }

    public function guardarCategoria(Request $request)
    {
        if (!$request->ajax()) return redirect('/');

        $categoria = new Categoria();
        $categoria->nombre = $request->nombre;
        $categoria->save();
    }

    public function actualizarCategoria(Request $request)
    {
        if (!$request->ajax()) return redirect('/');

        $categoria = Categoria::findOrFail($request->categoria_id);
        $categoria->nombre = $request->nombre;
        $categoria->save();
    }

    public function eliminarCategoria(Request $request){
        if (!$request->ajax()) return redirect('/');
        
        Categoria::findOrFail($request->id)->delete();
    }

    public function restaurarCategoria(Request $request){
        if (!$request->ajax()) return redirect('/');
        
        Categoria::withTrashed()->find($request->id)->restore();
    }
}
