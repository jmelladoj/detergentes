<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DetalleVenta extends Model
{
    //
    use SoftDeletes;

    protected $table = 'detalle_ventas';

    protected $fillable = ['venta_id', 'producto_id', 'cantidad'];

    public function producto(){
        return $this->belongsTo(Producto::class, 'producto_id');
    }
}
