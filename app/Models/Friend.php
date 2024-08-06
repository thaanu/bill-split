<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Friend extends Model
{
    use HasFactory;

    protected $table = 'friend';

    protected $fillable = ['friend_name', 'friend_id_number', 'friend_id_expiry_date', 'user_id'];

}
