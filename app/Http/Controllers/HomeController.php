<?php

namespace App\Http\Controllers;

use App\DetalleVenta;
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
        
        $lunes = Carbon::parse('monday this week')->format('Y-m-d');
        $martes = Carbon::parse('Tuesday this week')->format('Y-m-d');
        $miercoles = Carbon::parse('wednesday this week')->format('Y-m-d');
        $jueves = Carbon::parse('thursday this week')->format('Y-m-d');
        $viernes = Carbon::parse('friday this week')->format('Y-m-d');
        $sabado = Carbon::parse('saturday this week')->format('Y-m-d');
        $domingo = Carbon::parse('sunday this week')->format('Y-m-d');

        $ventas = Venta::whereBetween('fecha', [$lunes, $domingo])->orderBy('created_at')->get();

        $ventas_lunes = Venta::whereDate('fecha', $lunes)->get()->sum('total');
        $ventas_martes = Venta::whereDate('fecha', $martes)->get()->sum('total');
        $ventas_miercoles = Venta::whereDate('fecha', $miercoles)->get()->sum('total');
        $ventas_jueves = Venta::whereDate('fecha', $jueves)->get()->sum('total');
        $ventas_viernes = Venta::whereDate('fecha', $viernes)->get()->sum('total');
        $ventas_sabado = Venta::whereDate('fecha', $sabado)->get()->sum('total');

        $productos_vendido = 0;

        foreach($ventas AS $item){
            $detalles = DetalleVenta::where('venta_id', $item->id)->get();

            foreach($detalles AS $item){
                $productos_vendido += $item->cantidad;
            }
            
        }

        $cantidad_ventas = $ventas->count();
        $total_ventas = $ventas->sum('total');


        return [
            'resumen' => [
                'cantidad_ventas' => $cantidad_ventas,
                'productos_vendido' => $productos_vendido,
                'total_ventas' => $total_ventas,
                'ventas_lunes' => $ventas_lunes,
                'ventas_martes' => $ventas_martes,
                'ventas_miercoles' => $ventas_miercoles,
                'ventas_jueves' => $ventas_jueves,
                'ventas_viernes' => $ventas_viernes,
                'ventas_sabado' => $ventas_sabado,
            ]
        ];
    }
}
