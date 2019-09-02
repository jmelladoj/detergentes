<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Empresa extends Model
{
    //
    protected $table = 'empresas';

    protected $fillable = ['rut', 'nombre', 'giro', 'telefono', 'direccion', 'comuna', 'correo', 'empresa', 'proveedor'];
}
