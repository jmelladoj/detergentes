<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        App\Perfil::create([
            'nombre' => 'ADMINISTRADOR',
            'crear' => true,
            'editar' => true,
            'eliminar' => true,
            'agregar' => true,
            'descargar' => true,
            'ver' => true,
            'enviar' => true,
            'm_dashboard' => true,
            'm_sucursales' => true,
            'm_usuarios' => true,
            'm_perfiles' => true,
            'm_categorias_productos' => true,
            'm_productos' => true,
            'm_stock_manual' => true,
            'm_categorias_clientes' => true,
            'm_clientes' => true,
            'm_ventas' => true,
            'm_sin_stock' => true,
            'm_stock' => true,
            'm_empresas' => true,
            'm_cotizaciones' => true,
            'm_ordenes_compra' => true,
            'm_normal' => true,
            'm_premium' => true,
            'm_pendientes' => true
        ]);
        
        App\User::create([
            'name' => 'Administrador',
            'email' => 'admin@detergentesprocleaning.cl',
            'password' => bcrypt('12345678'),
            'perfil_id' => 1
        ]);
    }
}
