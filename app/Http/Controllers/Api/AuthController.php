<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login ( Request $request ){
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);
        $user = User::where('email', $request->email)->first();
        if ( ! $user || ! Hash::check($request->password, $user->password ) ) {
            return ['message' => 'Invalid credentials'];
        }
        $token = $user->createToken($user->name);
        return ['token' => $token->plainTextToken];
    }

    public function logout ( Request $request ) 
    {
        $request->user()->tokens()->delete();
        return ['message' => "logged out"];
    }
}
