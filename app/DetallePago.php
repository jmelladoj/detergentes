<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DetallePago extends Model
{
    //
    protected $table = 'detalle_pagos';

    protected $fillable = ['venta_id', 'monto_pago', 'medio_pago', 'numero_documento'];
}
