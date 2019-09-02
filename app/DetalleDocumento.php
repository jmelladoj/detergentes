<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DetalleDocumento extends Model
{
    //
    protected $table = 'detalle_documentos';

    protected $fillable = ['documento_id', 'producto', 'cantidad', 'unidad', 'valor'];

}
