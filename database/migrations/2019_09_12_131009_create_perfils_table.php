<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePerfilsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('perfiles', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nombre');
            $table->boolean('crear')->default(false);
            $table->boolean('editar')->default(false);
            $table->boolean('eliminar')->default(false);
            $table->boolean('agregar')->default(false);
            $table->boolean('descargar')->default(false);
            $table->boolean('ver')->default(false);
            $table->boolean('enviar')->default(false);

            $table->boolean('m_dashboard')->default(false);
            $table->boolean('m_sucursales')->default(false);
            $table->boolean('m_usuarios')->default(false);
            $table->boolean('m_perfiles')->default(false);
            $table->boolean('m_categorias_productos')->default(false);
            $table->boolean('m_productos')->default(false);
            $table->boolean('m_stock_manual')->default(false);
            $table->boolean('m_categorias_clientes')->default(false);
            $table->boolean('m_clientes')->default(false);
            $table->boolean('m_ventas')->default(false);
            $table->boolean('m_sin_stock')->default(false);
            $table->boolean('m_stock')->default(false);
            $table->boolean('m_empresas')->default(false);
            $table->boolean('m_cotizaciones')->default(false);
            $table->boolean('m_ordenes_compra')->default(false);
            $table->boolean('m_normal')->default(false);
            $table->boolean('m_premium')->default(false);
            $table->boolean('m_pendientes')->default(false);
            $table->boolean('m_dashboard_especifico')->default(false);

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
        Schema::dropIfExists('perfiles');
    }
}
