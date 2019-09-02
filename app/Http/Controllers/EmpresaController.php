<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Empresa;

class EmpresaController extends Controller
{
    //
    public function index(Request $request){
        if (!$request->ajax()) return redirect('/');
        
        $empresas = Empresa::orderBy('nombre', 'asc')->get();

        return [
            'empresas' => $empresas
        ];
    }

    public function guardarEmpresa(Request $request)
    {
        if (!$request->ajax()) return redirect('/');

        $empresa = new Empresa();
        $empresa->nombre = $request->nombre;
        $empresa->rut = $request->rut;
        $empresa->direccion = $request->direccion;
        $empresa->giro = $request->giro;
        $empresa->telefono = $request->telefono;
        $empresa->direccion = $request->direccion;
        $empresa->comuna = $request->comuna;
        $empresa->correo = $request->correo;
        $empresa->save();
    }

    public function actualizarEmpresa(Request $request)
    {
        if (!$request->ajax()) return redirect('/');

        $empresa = Empresa::findOrFail($request->empresa_id);
        $empresa->nombre = $request->nombre;
        $empresa->rut = $request->rut;
        $empresa->direccion = $request->direccion;
        $empresa->giro = $request->giro;
        $empresa->telefono = $request->telefono;
        $empresa->direccion = $request->direccion;
        $empresa->comuna = $request->comuna;
        $empresa->correo = $request->correo;
        $empresa->save();
    }

    public function eliminarEmpresa(Request $request){
        if (!$request->ajax()) return redirect('/');
        
        $empresa = Empresa::findOrFail($request->id);
        $empresa->delete(); 
    }
}
