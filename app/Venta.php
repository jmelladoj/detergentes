<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Venta extends Model
{
    //
    protected $table = 'ventas';

    protected $fillable = ['subtotal', 'descuento', 'total', 'fecha', 'sucursal_id', 'tipo_documento'];

    use SoftDeletes;

    protected $dates = ['deleted_at'];

    public function detalle(){
        return $this->hasMany(DetalleVenta::class, 'venta_id');
    }

    public function pago(){
        return $this->hasMany(DetallePago::class, 'venta_id');
    }

}
