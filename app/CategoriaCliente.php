<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CategoriaCliente extends Model
{
    //
    protected $table = 'categoria_clientes';
    
    use SoftDeletes;

    protected $fillable = ['nombre'];
    protected $dates = ['deleted_at'];
}
