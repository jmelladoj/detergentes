<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DesgloceVenta extends Model
{
    //
    protected $guarded = ['id'];
    protected $appends = ['productoNombre'];

    public function producto(){
        return $this->belongsTo(Producto::class, 'producto_id');
    }

    public function getProductoNombreAttribute(){
        return $this->producto->nombre;
    }
}
