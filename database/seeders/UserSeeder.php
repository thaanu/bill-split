<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{

    private $data = [
        ['name' => 'Ahmed Shan', 'email' => 'ahmed.shan@villatravels.com', 'password' => 'shan@123']
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        foreach ($this->data as $value) {
            $duplicate = User::where('email', $value['email'])->first();
            if (empty($duplicate)) {
                User::create([
                    'name' => $value['name'],
                    'email' => $value['email'],
                    'password' => Hash::make($value['password'])
                ]);
            }
        }
    }
}
