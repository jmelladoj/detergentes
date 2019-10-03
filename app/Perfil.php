<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Perfil extends Model
{
    //
    use SoftDeletes;

    protected $table = 'perfiles';

    protected $dates = ['deleted_at'];

}