<?php

namespace App\Http\Controllers;

use App\DetalleVenta;
use App\Sucursal;
use App\Venta;
use Carbon\Carbon;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
    }

    public function resumen(Request $request){
        if (!$request->ajax()) return redirect('/');

        $sucursales = Sucursal::orderBy('nombre')->get();
        $colores = [ '#DC143C', '#FFA500' , '#BDB76B', '#6B8E23', '#20B2AA' , '#4169E1', '#8A2BE2', '#DB7093'];

        $lunes = Carbon::parse('monday this week')->format('Y-m-d');
        $martes = Carbon::parse('Tuesday this week')->format('Y-m-d');
        $miercoles = Carbon::parse('wednesday this week')->format('Y-m-d'); 
        $jueves = Carbon::parse('thursday this week')->format('Y-m-d');
        $viernes = Carbon::parse('friday this week')->format('Y-m-d');
        $sabado = Carbon::parse('saturday this week')->format('Y-m-d');
        $domingo = Carbon::parse('sunday this week')->format('Y-m-d');

        $ventas_sucursales = array();

        foreach($sucursales AS $key=>$sucursal){
            $ventas = Venta::whereBetween('fecha', [$lunes, $domingo])->where('sucursal_id', $sucursal->id)->get();
            $ventas_lunes = Venta::whereDate('fecha', $lunes)->where('sucursal_id', $sucursal->id)->get()->sum('total');
            $ventas_martes = Venta::whereDate('fecha', $martes)->where('sucursal_id', $sucursal->id)->get()->sum('total');
            $ventas_miercoles = Venta::whereDate('fecha', $miercoles)->where('sucursal_id', $sucursal->id)->get()->sum('total');
            $ventas_jueves = Venta::whereDate('fecha', $jueves)->where('sucursal_id', $sucursal->id)->get()->sum('total');
            $ventas_viernes = Venta::whereDate('fecha', $viernes)->where('sucursal_id', $sucursal->id)->get()->sum('total');
            $ventas_sabado = Venta::whereDate('fecha', $sabado)->where('sucursal_id', $sucursal->id)->get()->sum('total');

            $productos_vendido = 0;

            foreach($ventas AS $item){
                $detalle = DetalleVenta::where('venta_id', $item->id)->get();

                foreach($detalle AS $item){
                    $productos_vendido += $item->cantidad;
                }
            }
            
            $venta = array(
                'sucursal' => $sucursal->nombre,
                'total' => $ventas->sum('total'),
                'cantidad' => $ventas->count(),
                'productos_vendidos' => $productos_vendido,
                'color' => $colores[$key],
                'ventas_lunes' => $ventas_lunes,
                'ventas_martes' => $ventas_martes,
                'ventas_miercoles' => $ventas_miercoles,
                'ventas_jueves' => $ventas_jueves,
                'ventas_viernes' => $ventas_viernes,
                'ventas_sabado' => $ventas_sabado,
            );

            array_push($ventas_sucursales, $venta);
        }





        return [
            'resumen' => [
                'ventas_sucursales' => $ventas_sucursales
            ]
        ];
    }
}
