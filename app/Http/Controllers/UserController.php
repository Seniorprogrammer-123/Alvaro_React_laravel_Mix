<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\User;
use App\Models\Report;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        // echo "alphabet!";
        // upload
    }

    public function getUser(Request $request)
    {
        //

        $user = DB::table('users')->where(['email' => $request->username, 'password' => $request->password])->first();
        if($user){
            return response()->json(['is'=>'y', 'token'=>$user->remember_token, 'permission'=>$user->permission, 'user'=>$user, 'message'=>'Login Succeed!']);
        }
        return response()->json(['is'=>'n', 'token'=>null, 'permission'=>null, 'user'=>null, 'message'=>'Login Failed!']);
    }

    public function verifyToken($token)
    {
        //
        $user = DB::table('users')->where(['remember_token' => $token])->first();
        if($user){
            return response()->json(['is'=>'y', 'token'=>$user->remember_token, 'permission'=>$user->permission, 'user'=>$user, 'message'=>'Login Succeed!']);
        }
        return response()->json(['is'=>'n', 'token'=>null, 'user'=>null, 'message'=>'Login Failed!']);
    }

    public function getUserByPermission($permission)
    {
        $items = User::where('permission', $permission)->orderBy('created_at', 'desc')->get();
        return $items->toJson();
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $validatedData = $request->validate([
            'name' => 'required',
            'email' => 'required',
            'especialy' => 'required',
            'dni_number' => 'required',
            'password' => 'required',
        ]);

        $item = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'email_verified_at' => date("Y-m-d"),
            'password' => Hash::make($validatedData['password']),
            'dni_number' => $validatedData['dni_number'],
            'especialy' => $validatedData['especialy'],
            'permission' => 'User',
            'remember_token' => Str::random(60),
        ]);

        return response()->json("Create Successed!");
    }

    public function labstore(Request $request)
    {
        //
        $validatedData = $request->validate([
            'name' => 'required',
            'email' => 'required',
            'password' => 'required',
        ]);

        $item = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'email_verified_at' => date("Y-m-d"),
            'password' => Hash::make($validatedData['password']),
            'permission' => 'Lab',
            'remember_token' => Str::random(60),
        ]);

        return response()->json("Create Successed!");
    }

    public function adminstore(Request $request)
    {
        //
        $validatedData = $request->validate([
            'name' => 'required',
            'email' => 'required',
            'password' => 'required',
        ]);

        $item = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'email_verified_at' => date("Y-m-d"),
            'password' => Hash::make($validatedData['password']),
            'permission' => 'Admin',
            'remember_token' => Str::random(60),
        ]);

        return response()->json("Create Successed!");
    }

    public function upload(Request $request)
    {
      //check file
      if ($request->hasFile('image'))
      {
            $file      = $request->file('image');
            $filename  = $file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();
            $picture   = $filename;
            //move image to public/img folder
            $file->move(public_path('uploads/dnis'), $picture);
            return response()->json(["message" => $picture]);
      }
      else
      {
            return response()->json(["message" => "Select image first."]);
      }

    }




    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
        $item = User::find($id);
        return response()->json($item);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $item = User::find($id);
        $item->name = $request->name;
        $item->password = Hash::make($request->password);
        $item->email = $request->email;
        $item->especialy = $request->especialy;
        $item->dni_number = $request->dni_number;
        $item->save();

        return response()->json('Successfully Updated');
    }

    public function labupdate(Request $request, $id)
    {
        //
        $item = User::find($id);
        $item->name = $request->name;
        $item->password = Hash::make($request->password);
        $item->email = $request->email;
        $item->save();

        return response()->json('Successfully Updated');
    }

    public function adminupdate(Request $request, $id)
    {
        //
        $item = User::find($id);
        $item->name = $request->name;
        $item->password = Hash::make($request->password);
        $item->email = $request->email;
        $item->save();

        return response()->json('Successfully Updated');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $item = User::find($id);
        $item->delete();

        return response()->json('Successfully Deleted');
    }
}
