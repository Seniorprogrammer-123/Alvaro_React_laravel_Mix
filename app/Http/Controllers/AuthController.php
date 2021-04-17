<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
class AuthController extends Controller
{
    /**
     * Create user
     *
     * ...
     */
    public function signup(Request $request)
    {

        // ... validation check part here
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'remember_token' => Str::random(60),
        ]);

        if($user){
            return response()->json([
                'success' => true,
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'access_token' => $user->remember_token,
            ], 201);
        }else{
            return response()->json([
                'success' => false
            ]);
        }

    }

    /**
     * Login user and create token
     *
     * ...
     */
    public function login(Request $request)
    {
        /**
         * Hash Compare Method Start ===============================================
         */
        // $pw = 123456;
        // echo $pw;
        // // 123456
        // $hashed = Hash::make($pw);
        // echo $hashed;
        // // '$2y$10$xSugoyKv765TY8DsERJ2/.mPIOwLNdM5Iw1n3x1XNVymBlHNG4cX6'
        // echo Hash::check($hashed, $pw);
        // // false
        // echo Hash::check($pw, $hashed);
        // // true
        /**
         * Hash Compare Method End =================================================
         */
        // ... validation check part here
        $user = User::where('email', '=', $request->email)->first();
        if(!Hash::check($request->password, $user->password)){
            return response()->json([
                'success' => false,
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'permission' => $user->permission,
                'access_token' => $user->remember_token
            ]);
        }else{
            return response()->json([
                'success' => true,
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'permission' => $user->permission,
                'access_token' => $user->remember_token
            ]);
        }
    }
}
