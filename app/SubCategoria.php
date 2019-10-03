<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;

class SubCategoria extends Model
{
    //
    protected $table = 'sub_categorias';
    
    use SoftDeletes;

    protected $dates = ['deleted_at'];

    public function categoria(){
        return $this->belongsTo('App\Categoria', 'categoria_id');
    }

    public function ventaSemanal(){
        $total = 0;
        $lunes = Carbon::parse('monday this week')->format('Y-m-d');
        $domingo = Carbon::parse('sunday this week')->format('Y-m-d');
        $ventas = Venta::whereBetween('fecha', [$lunes, $domingo])->get();

        foreach($ventas AS $item){
            $detalle = DetalleVenta::where('venta_id', $item->id)->get();

            foreach($detalle AS $item){
                if($item->producto->sub_categoria_id == $this->id){
                    $total += $item->cantidad * $item->producto->precio_normal;
                }
            }
        }

        return $total;
    }
}
