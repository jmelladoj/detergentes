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
        App\User::create([
            'name' => 'Administrador',
            'email' => 'admin@detergentesprocleaning.cl',
            'password' => bcrypt('12345678'),
            'perfil_id' => 1
        ]);
    }
}
