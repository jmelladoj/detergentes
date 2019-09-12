<?php

namespace App\Http\Controllers;

use App\Perfil;
use Illuminate\Http\Request;

class PerfilController extends Controller
{
    //
    public function index(Request $request){
        if (!$request->ajax()) return redirect('/');
        
        $perfiles = Perfil::orderBy('nombre', 'asc')->get();

        return [
            'perfiles' => $perfiles
        ];
    }

    public function guardar(Request $request)
    {
        if (!$request->ajax()) return redirect('/');

        $perfil = new Perfil();
        $perfil->nombre = $request->nombre;
        $perfil->crear  = $request->crear;
        $perfil->editar  = $request->editar;
        $perfil->eliminar  = $request->eliminar;
        $perfil->agregar  = $request->agregar;
        $perfil->descargar  = $request->descargar;
        $perfil->ver  = $request->ver;
        $perfil->enviar  = $request->enviar;
        $perfil->m_dashboard = $request->m_dashboard;
        $perfil->m_sucursales = $request->m_sucursales;
        $perfil->m_usuarios = $request->m_usuarios;
        $perfil->m_perfiles = $request->m_perfiles;
        $perfil->m_categorias_productos = $request->m_categorias_productos;
        $perfil->m_productos = $request->m_productos;
        $perfil->m_stock_manual = $request->m_stock_manual;
        $perfil->m_categorias_clientes = $request->m_categorias_clientes;
        $perfil->m_clientes = $request->m_clientes;
        $perfil->m_ventas = $request->m_ventas;
        $perfil->m_sin_stock = $request->m_sin_stock;
        $perfil->m_stock = $request->m_stock;
        $perfil->m_empresas = $request->m_empresas;
        $perfil->m_cotizaciones = $request->m_cotizaciones;
        $perfil->m_ordenes_compra = $request->m_ordenes_compra;
        $perfil->m_normal = $request->m_normal;
        $perfil->m_premium = $request->m_premium;
        $perfil->m_pendientes = $request->m_pendientes;
        $perfil->save();
    }

    public function actualizar(Request $request)
    {
        if (!$request->ajax()) return redirect('/');

        $perfil = Perfil::findOrFail($request->perfil_id);
        $perfil->nombre = $request->nombre;
        $perfil->crear  = $request->crear;
        $perfil->editar  = $request->editar;
        $perfil->eliminar  = $request->eliminar;
        $perfil->agregar  = $request->agregar;
        $perfil->descargar  = $request->descargar;
        $perfil->ver  = $request->ver;
        $perfil->enviar  = $request->enviar;
        $perfil->m_dashboard = $request->m_dashboard;
        $perfil->m_sucursales = $request->m_sucursales;
        $perfil->m_usuarios = $request->m_usuarios;
        $perfil->m_perfiles = $request->m_perfiles;
        $perfil->m_categorias_productos = $request->m_categorias_productos;
        $perfil->m_productos = $request->m_productos;
        $perfil->m_stock_manual = $request->m_stock_manual;
        $perfil->m_categorias_clientes = $request->m_categorias_clientes;
        $perfil->m_clientes = $request->m_clientes;
        $perfil->m_ventas = $request->m_ventas;
        $perfil->m_sin_stock = $request->m_sin_stock;
        $perfil->m_stock = $request->m_stock;
        $perfil->m_empresas = $request->m_empresas;
        $perfil->m_cotizaciones = $request->m_cotizaciones;
        $perfil->m_ordenes_compra = $request->m_ordenes_compra;
        $perfil->m_normal = $request->m_normal;
        $perfil->m_premium = $request->m_premium;
        $perfil->m_pendientes = $request->m_pendientes;
        $perfil->save();
    }

    public function eliminar(Request $request){
        if (!$request->ajax()) return redirect('/');
        
        Perfil::findOrFail($request->id)->delete(); 
    }
}
