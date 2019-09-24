<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cliente extends Model
{
    //
    protected $table = 'clientes';
    
    use SoftDeletes;

    protected $dates = ['deleted_at'];

    public function lista()
    {
        return $this->hasMany(ListaCliente::class, 'cliente_id');
    }
}
