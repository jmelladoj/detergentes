<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DetallePago extends Model
{
    //
    use SoftDeletes;

    protected $table = 'detalle_pagos';

    protected $fillable = ['venta_id', 'monto_pago', 'medio_pago', 'numero_documento'];
}
