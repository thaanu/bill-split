<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CustomerController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;

// Authentication
Route::post('/login', [AuthController::class, 'login']);

Route::middleware([
    'auth:sanctum'
])->group(function () {
    
    // Logout Route
    Route::post('/logout', [AuthController::class, 'logout']);

    // Customers
    Route::post('/crm/customer-updated', [CustomerController::class, 'customerUpdated']);
    Route::post('/crm/customer-approved', [CustomerController::class, 'newRegisration']);
    Route::post('/crm/customer-request-response', [CustomerController::class, 'handleCustomerRequestResponse']);
    

    // Default Route for getting user
    // Route::get('/user', function (Request $request) {
    //     return $request->user();
    // });
    
});

