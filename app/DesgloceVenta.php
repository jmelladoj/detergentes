<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DesgloceVenta extends Model
{
    //
    protected $guarded = ['id'];

    public function producto(){
        return $this->belongsTo(Producto::class, 'producto_id');
    }
}
