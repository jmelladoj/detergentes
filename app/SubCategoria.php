<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SubCategoria extends Model
{
    //
    protected $table = 'sub_categorias';
    
    use SoftDeletes;

    protected $dates = ['deleted_at'];

    public function categoria(){
        return $this->belongsTo('App\Categoria', 'categoria_id');
    }
}
