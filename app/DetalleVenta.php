<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DetalleVenta extends Model
{
    //
    protected $table = 'detalle_ventas';

    protected $fillable = ['venta_id', 'producto_id', 'cantidad'];

    public function producto(){
        return $this->belongsTo(Producto::class, 'producto_id');
    }
}
