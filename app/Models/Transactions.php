<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transactions extends Model
{
    use HasFactory;

    protected $table = 'money_transactions';

    protected $fillable = [
        'sender_user_id',
        'receiver_user_id',
        'receiver_name',
        'receiver_id_number',
        'currency',
        'transfer_amount',
        'transfer_service_charge',
        'transfer_total',
        'transaction_purpose',
        'other_transfer_reason',
        'country_initials',
        'service_code',
        'sender_mobile_number',
        'transfer_slip_file',
        'transfer_uid',
        'transaction_status'
    ];


}
