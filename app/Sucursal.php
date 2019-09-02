<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Sucursal extends Model
{
    //
    protected $table = 'sucursales';
    
    use SoftDeletes;

    protected $dates = ['deleted_at'];

    public function productos()
    {
        return $this->hasMany(StockSucursal::class, 'sucursal_id');
    }
}
