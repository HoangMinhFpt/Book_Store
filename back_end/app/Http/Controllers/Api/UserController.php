<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;

class UserController
{
    public function index(Request $request)
    {
        try {
            $user = auth()->user();
            if(!$user) {
                return response()->json(
                    [
                    'status'=>false,
                    'message'=>'You should login first',
                    'data'=>[]
                    ], 401
                );
            }

            $users = User::where('fullname', '!=', '');
            if(isset($request->fullname) && $request->fullname != '') {
                $users = $users->where('fullname', 'like', '%'.$request->fullname.'%');
            }
            if(isset($request->address) && $request->address != '') {
                $users = $users->where('address', 'like', '%'.$request->address.'%');
            }

            $users = $users->paginate($request->limit);

            return response()->json(
                [
                'status' => true,
                'message' => 'Users list successfully',
                'data' => $users
                ], 200
            );
        } catch (\Exception $e) {
            Log::error('Get user error: '.$e->getMessage());
            return response()->json(
                [
                'status' => false,
                'message' => 'An error occurred',
                'error'=>$e->getMessage(),
                'data'=>[]
                ], 500
            );
        }
    }

    public function register(Request $request)
    {
        try{
            $validateUser = Validator::make(
                $request->all(), [
                    'username' => 'required',
                    'email' => 'required|email|unique:users,email',
                    'password' => 'required',
                    'role_name' => 'required'
                    ]
            );
                
            if($validateUser->fails()) {
                return response()->json(
                    [
                        'status' => false,
                        'message' => 'validation error',
                        'errors' => $validateUser->errors()
                    ], 401
                );
            }
                
                $user = User::create(
                    [
                        'username' => $request->username,
                        'email' => $request->email,
                        'password' => Hash::make($request->password),
                        'role_name' => $request->role_name
                        ]
                );
                    
                    return response()->json(
                        [
                            'status' => true,
                            'message' => 'User created successfully',
                            'token' => $user->createToken("API TOKEN")->plainTextToken
                        ], 200
                    );
        } catch (\Exception $e) {
            Log::error('Register user error: '.$e->getMessage());
            return response()->json(
                [
                'status' => false,
                'message' => 'An error occurred',
                'error'=>$e->getMessage(),
                'data'=>[]
                ], 500
            );
        }
    }

    public function login(Request $request)
    {
        try {
            $validateUser = Validator::make(
                $request->all(), [
                    'email' => 'required|email',
                    'password' => 'required'
                    ]
            );
                
            if($validateUser->fails()) {
                return response()->json(
                    [
                        'status' => false,
                        'message' => 'validation error',
                        'errors' => $validateUser->errors()
                    ], 401
                );
            }

            if(!Auth::attempt($request->only(['email', 'password']))) {
                return response()->json(
                    [
                        'status' => false,
                        'message' => 'Email and password does not match with our record.'
                    ], 401
                );
            }

            $user = User::where('email', $request->email)->first();

            return response()->json(
                [
                    'status' => true,
                    'message' => 'User logging successfully',
                    'token' => $user->createToken("API TOKEN")->plainTextToken,
                    'user' => $user
                ], 200
            );
            
        } catch (\Exception $e) {
            Log::error('Login user error: '.$e->getMessage());
            return response()->json(
                [
                'status' => false,
                'message' => 'An error occurred',
                'error'=>$e->getMessage(),
                'data'=>[]
                ], 500
            );
        }
    }
    
    public function profile()
    {
        try {
            $user = auth()->user();
            if(!$user) {
                return response()->json(
                    [
                    'status'=>false,
                    'message'=>'You should login first',
                    'data'=>[]
                    ], 401
                );
            }
            
            return response()->json(
                [
                'status' => true,
                'message' => 'User profile',
                'data' => $user,
                'id' => auth()->user()->id
                ], 200
            );
            
        } catch (\Exception $e) {
            Log::error('Get profile user error: '.$e->getMessage());
            return response()->json(
                [
                'status' => false,
                'message' => 'An error occurred',
                'error'=>$e->getMessage(),
                'data'=>[]
                ], 500
            );
        }
    }

    public function logout()
    {
        try {
            auth()->user()->tokens()->delete();

            return response()->json(
                [
                'status'=> true,
                'message' => 'Logout successfully',
                'data' => []
                ], 200
            );
        } catch (\Exception $e) {
            Log::error('Logout user error: '.$e->getMessage());
            return response()->json(
                [
                'status' => false,
                'message' => 'An error occurred',
                'error'=>$e->getMessage(),
                'data'=>[]
                ], 500
            );
        }
    }

    public function update(Request $request)
    {
        try {
            $users = auth()->user();
            if(!$users) {
                return response()->json(
                    [
                    'status'=>false,
                    'message'=>'You should login first',
                    'data'=>[]
                    ], 401
                );
            }

            if(!$request->id) {
                return response()->json(
                    [
                        'status'=>false,
                        'message'=>'Missing input user_id',
                        'data'=>[]
                        ], 400
                );
            }
            $user = User::find($request->id);

            $validateUser = Validator::make(
                $request->all(), [
                    'fullname' => ['required'],
                    'email' => [
                        'required',
                        Rule::unique('users')->ignore($user->id),
                    ],
                    ]
            );

            if($validateUser->fails()) {
                return response()->json(
                    [
                        'status' => false,
                        'message' => 'validation error',
                        'errors' => $validateUser->errors()
                    ], 401
                );
            }

            $user->fullname = $request->fullname;
            $user->username = $request->username;
            $user->email = $request->email;
            $user->address = $request->address ?? '';
            $user->role_name = $request->role_name;
            // $user->password = bcrypt($request->password);
            $user->phone_number = $request->phone_number??'';
            $user->save();

            return response()->json(
                [
                    'status' => true,
                    'message' => 'User updated successfully',
                    'data' => $user
                ], 200
            );
        } catch (\Exception $e) {
            Log::error('Update user error: '.$e->getMessage());
            return response()->json(
                [
                'status' => false,
                'message' => 'An error occurred',
                'error'=>$e->getMessage(),
                'data'=>[]
                ], 500
            );
        }
    }

    public function updatePassword(Request $request)
    {
        Log::info('Update password: ', ['update password']);
        try {
            $user = auth()->user();
            if(!$user) {
                return response()->json(
                    [
                    'status'=>false,
                    'message'=>'You should login first',
                    'data'=>[]
                    ], 401
                );
            }

            $validateUser = Validator::make(
                $request->all(), [
                    'password' => 'required|string|confirmed',
                    'current_password' => 'required',
                    ]
            );

            if($validateUser->fails()) {
                return response()->json(
                    [
                        'status' => false,
                        'message' => 'Validation error',
                        'errors' => $validateUser->errors()
                    ], 400
                );
            }

            if (!Hash::check($request->current_password, $user->password)) {
                return response()->json(
                    [
                    'status' => false,
                    'message' => 'Current password is incorrect',
                    'data' => []
                    ], 400
                );
            }

            $user->password = bcrypt($request->password);
            $user->save();

            return response()->json(
                [
                    'status' => true,
                    'message' => 'User updated successfully',
                    'data' => $user
                ], 200
            );
        } catch (\Exception $e) {
            Log::error('Update password error: '.$e->getMessage());
            return response()->json(
                [
                'status' => false,
                'message' => 'An error occurred',
                'error'=>$e->getMessage(),
                'data'=>[]
                ], 500
            );
        }
    }

    public function delete(Request $request)
    {
        try {
            $users = auth()->user();
            if(!$users) {
                return response()->json(
                    [
                    'status'=>false,
                    'message'=>'You should login first',
                    'data'=>[]
                    ], 401
                );
            }

            if(!$request->id) {
                return response()->json(
                    [
                    'status'=>false,
                    'message'=>'Missing input user_id',
                    'data'=>[]
                    ], 400
                );
            }

            $user = User::find($request->id);
            $user->delete();
            return response()->json(
                [
                'status' => true,
                'message' => 'Delete user successfully',
                'data' => $user
                ], 200
            );
        } catch (\Exception $e) {
            Log::error('Update user error: '.$e->getMessage());
            return response()->json(
                [
                'status' => false,
                'message' => 'An error occurred',
                'error'=>$e->getMessage(),
                'data'=>[]
                ], 500
            );
        }
    }
}
