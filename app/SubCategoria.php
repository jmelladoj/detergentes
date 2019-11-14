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

    public function ventaSemanal($inicio, $termino){
        $total = 0;
        $ventas = Venta::whereBetween('fecha', [$inicio, $termino])->where('estado', 2)->get();

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
