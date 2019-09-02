<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('productos', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->string('nombre');
            $table->string('codigo');

            $table->integer('precio_costo')->delfault(0);
            $table->integer('precio_normal')->delfault(0);
            $table->integer('precio_mayorista')->delfault(0);

            $table->integer('cantidad_mayorista')->nullable()->delfault(0);

            $table->integer('stock')->delfault(0);
            $table->integer('stock_critico')->delfault(0);

            $table->unsignedBigInteger('sub_categoria_id')->nullable()->default(null);
            $table->foreign('sub_categoria_id')->references('id')->on('sub_categorias');

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('productos');
    }
}
