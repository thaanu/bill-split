<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WUController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\RequestsController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ReceiversController;

Route::get('/', function () {
    return Inertia::render('PortalLanding', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register')
    ]);
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

     // My Documents
     Route::get('/my-documents', [DashboardController::class, 'myDocuments'])->name('documents');
    
     // Requests
     Route::get('/requests', [RequestsController::class, 'index'])->name('requests');

    // Customer Information
    Route::get('/customer', [CustomerController::class, 'index'])->name('customer.show');
    Route::get('/customer/customer-info', [CustomerController::class, 'createCustomer'])->name('customer.create');
    Route::post('/customer/customer-info', [CustomerController::class, 'processCreateCustomer'])->name('customer.post');
    Route::post('/customer/customer-upload-document', [CustomerController::class, 'saveDocument'])->name('customer.upload');
    Route::post('/customer/customer-remove-document', [CustomerController::class, 'removeDocument'])->name('customer.remove-document');
    Route::post('/customer/customer-update', [CustomerController::class, 'updateDocument'])->name('customer.update-document');
    Route::get('/customer/view-document/{id}', [CustomerController::class, 'viewDocument'])->name('customer.view-document');


    // Receivers
    Route::get('/receivers', [ReceiversController::class, 'index'])->name('receivers.show');
    Route::post('/receivers/create', [ReceiversController::class, 'store'])->name('receivers.create');
    Route::post('/receivers/update', [ReceiversController::class, 'update'])->name('receivers.update');

    // Western Union
    Route::get('/wu', [WUController::class, 'index'])->name('wu.show');
    Route::get('/wu/send', [WUController::class, 'sendMoney'])->name('wu.send');
    Route::post('/wu/send', [WUController::class, 'saveTransaction'])->name('wu.save');
    Route::get('/wu/update', [WUController::class, 'updateRequest'])->name('wu.update');
    Route::get('/wu/view-slip', [WUController::class, 'viewTransferSlip'])->name('wu.view-slip');
    Route::post('/wu/remove-slip', [WUController::class, 'removeTransferSlip'])->name('wu.remove-slip');

   
});
