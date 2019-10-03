<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UserController extends Controller
{
    //
    public function index(Request $request){
        if (!$request->ajax()) return redirect('/');
        
        $usuarios = User::orderBy('name', 'asc')->get();

        return [
            'usuarios' => $usuarios
        ];
    }

    public function guardarUsuario(Request $request)
    {
        if (!$request->ajax()) return redirect('/');

        $usuario = new User();
        $usuario->name = $request->nombre;
        $usuario->email = $request->correo;
        $usuario->password = bcrypt($request->clave);
        $usuario->perfil_id = $request->perfil_id;
        $usuario->sucursal_id = $request->sucursal_id;
        $usuario->save();
    }

    public function actualizarUsuario(Request $request)
    {
        if (!$request->ajax()) return redirect('/');

        $usuario = User::findOrFail($request->usuario_id);
        $usuario->name = $request->nombre;
        $usuario->email = $request->correo;


        if($request->password != null || $request->password != '') {
            $usuario->password = bcrypt($request->clave);
        }

        $usuario->perfil_id = $request->perfil_id;
        $usuario->sucursal_id = $request->sucursal_id;
        $usuario->save();
    }

    public function eliminarUsuario(Request $request){
        if (!$request->ajax()) return redirect('/');
        
        $usuario = User::findOrFail($request->id);
        $usuario->delete(); 
    }

}
