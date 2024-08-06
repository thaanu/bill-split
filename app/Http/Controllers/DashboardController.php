<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{

    protected $customerServices;

    public function index() 
    {

        // Fetch current logged in user information
        $userId = auth()->user()->id;
        $customer = DB::table('customers')->where('user_id', $userId)->first();

        return Inertia::render('Dashboard', [
            'customer' => ($customer ? $customer : [])
        ]);

    }

}
