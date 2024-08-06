<?php

namespace App\Http\Controllers\Api;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;

class CustomerController extends Controller
{
    /**
     * This method handles new customer registrations send from CRM
     *
     * @return  void
     */
    public function newRegisration( Request $request ) 
    {
        /**
         * Expected Fields
         * - Local Customer ID      `customer_id`
         * - CRM Customer ID        `crm_customer_id`
         * - Approved or Rejected   `request_status`
         * - Rejected Reason        `rejected_reason`
         */

        $customer = DB::find('customers')->where('id', $request->customer_id);

        if ( ! $customer ) {
            return ['message' => 'Requested customer not found'];
        }

        $customer->save();

        return ['message' => 'Record updated'];

    }

    public function handleCustomerRequestResponse( Request $request ) {


        Log::debug($request);


        $customerId = $request->vp_customer_id;
        Log::debug($customerId);

        $customer = DB::table('customers')
              ->where('id', $customerId)
              ->update([
                'kyc_status' => strtoupper($request->action),
                'updated_at' => Carbon::now()
              ]);

        if ( ! $customer ) {
            return ['message' => 'Unable to update request'];
        }

        return ['message' => 'Record updated'];
    }

}
