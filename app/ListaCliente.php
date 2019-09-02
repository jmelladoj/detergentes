<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ListaCliente extends Model
{
    //
    protected $table = 'lista_clientes';

    protected $fillable = ['cliente_id', 'producto_id', 'precio_neto', 'precio_normal', 'observacion'];

    public function producto(){
        return $this->belongsTo(Producto::class, 'producto_id');
    }
}





