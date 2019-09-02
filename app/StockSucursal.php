<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StockSucursal extends Model
{
    //
    protected $table = 'stock_sucursales';

    protected $fillable = ['producto_id', 'sucursal_id', 'stock'];

    public function sucursal(){
        return $this->belongsTo(Sucursal::class, 'sucursal_id');
    }
}
