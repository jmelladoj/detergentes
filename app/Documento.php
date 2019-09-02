<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Documento extends Model
{
    //
    use SoftDeletes;
    
    protected $table = 'documentos';

    protected $fillable = ['empresa_id', 'subtotal', 'total', 'tipo', 'fecha', 'user_id'];

    protected $dates = ['deleted_at'];

    public function empresa(){
        return $this->belongsTo(Empresa::class, 'empresa_id');
    }

    public function encargado(){
        return $this->belongsTo(User::class, 'user_id');
    }
}
