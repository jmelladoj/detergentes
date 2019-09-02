<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Producto extends Model
{
    //
    protected $table = 'productos';
    
    use SoftDeletes;

    protected $fillable = ['id', 'stock'];


    protected $dates = ['deleted_at'];
}
