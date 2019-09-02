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
            'name' => 'Juan Mellado',
            'email' => 'jmellado@test.cl',
            'password' => bcrypt('12345678')
        ]);
    }
}
