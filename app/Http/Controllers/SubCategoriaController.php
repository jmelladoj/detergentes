<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\SubCategoria;
use App\Producto;

class SubCategoriaController extends Controller
{
    //
    public function index(Request $request){
        if (!$request->ajax()) return redirect('/');
        
        $subCategorias = SubCategoria::with('categoria')->orderBy('nombre', 'asc')->get();

        return [
            'subCategorias' => $subCategorias
        ];
    }

    public function indexCategoria(Request $request){
        if (!$request->ajax()) return redirect('/');
        
        $subCategorias = SubCategoria::where('categoria_id', $request->categoria_id)->orderBy('nombre', 'asc')->withTrashed()->get();

        return [
            'subCategorias' => $subCategorias
        ];
    }

    public function guardarSubCategoria(Request $request)
    {
        if (!$request->ajax()) return redirect('/');

        $subcategoria = new SubCategoria();
        $subcategoria->nombre = $request->nombre;
        $subcategoria->categoria_id = $request->categoria_id;
        $subcategoria->save();
    }


    public function eliminarSubCategoria(Request $request){
        if (!$request->ajax()) return redirect('/');

        $subcategoria = SubCategoria::findOrFail($request->id);
        $productos = Producto::where('sub_categoria_id', $subcategoria->id)->get()->count();

        if($productos > 0){
            $subcategoria->delete();
        } else {
            $subcategoria->forceDelete();
        }
    }

    public function restaurarSubCategoria(Request $request){
        if (!$request->ajax()) return redirect('/');
        
        SubCategoria::withTrashed()->find($request->id)->restore();
    }
}
