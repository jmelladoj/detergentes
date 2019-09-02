<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LogStockRegistro extends Model
{
    //
    protected $table = 'log_stock_registros';

    protected $fillable = ['mensaje'];
}
