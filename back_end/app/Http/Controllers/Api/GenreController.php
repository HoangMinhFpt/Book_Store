<?php

namespace App\Http\Controllers\Api;

use App\Models\Genre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class GenreController
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

            $genres = Genre::where('genre_name', '!=', '');
            if(isset($request->genre_name) && $request->genre_name != '') {
                $genres = $genres->where('genre_name', 'like', '%'.$request->genre_name.'%');
            }

            if(!$request->page) {
                $genres = Genre::all();
                return response()->json(
                    [
                        'status' => true,
                        'message' => 'Get all genre list successfully',
                        'data' => $genres
                    ], 201
                );
            }

            $genres = $genres->paginate($request->limit??5);

            return response()->json(
                [
                'status' => true,
                'message' => 'Genres list successfully',
                'data' => $genres
                ], 200
            );
        } catch (\Exception $e) {
            Log::error('Get genre error: '.$e->getMessage());
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

    public function get(Request $request)
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

            if(!$request->id) {
                return response()->json(
                    [
                    'status'=>false,
                    'message'=>'Missing input genre_id',
                    'data'=>[]
                    ], 400
                );
            }

            $genre = Genre::find($request->id);

            return response()->json(
                [
                'status'=>true,
                'message'=>'Get genre successfully',
                'data'=>$genre
                ], 200
            );
        } catch (\Exception $e) {
            Log::error('Get a genre error: '.$e->getMessage());
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

    public function create(Request $request)
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

            $validateGenre = Validator::make(
                $request->all(), [
                    'genre_name'=>'required|unique:genres,genre_name'
                ]
            );

            if($validateGenre->fails()) {
                return response()->json(
                    [
                    'status'=>false,
                    'message'=>'Input genre missing',
                    'data'=>$validateGenre->errors()
                    ], 422
                );
            }

            $inputData = array(
                'genre_name'=>$request->genre_name
            );

            $genre = Genre::create($inputData);

            return response()->json(
                [
                'status'=>true,
                'message'=>'Create genre succesfully',
                'data'=>$genre
                ], 200
            );
        } catch (\Exception $e) {
            Log::error('Create genre error: '.$e->getMessage());
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

            $validateGenre= Validator::make(
                $request->all(), [
                'genre_name'=>'required|max:25'
                ]
            );
            
            if($validateGenre->fails()) {
                return response()->json(
                    [
                    'status'=>false,
                    'message'=>'Input genre missing',
                    'data'=>$validateGenre->errors()
                    ], 400
                );
            }

            if(!$request->id) {
                return response()->json(
                    [
                    'status'=>true,
                    'message'=>'Input missing genre_id',
                    'data'=>[]
                    ], 400
                );
            }

            $genre = Genre::find($request->id);
            $genre->genre_name = $request->genre_name;
            $genre->save();

            return response()->json(
                [
                'status'=>true,
                'message'=>'Update genre successfully',
                'data'=>$genre
                ], 200
            );
        } catch (\Exception $e) {
            Log::error('Update genre error: '.$e->getMessage());
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

            if(!$request->id) {
                return response()->json(
                    [
                    'status'=>false,
                    'message'=>'Missing input genre_id',
                    'data'=>[]
                    ], 400
                );
            }

            $genre = Genre::find($request->id);
            $genre->delete();

            return response()->json(
                [
                'status'=>true,
                'message'=>'Delete genre successfully',
                'data'=>$genre
                ], 200
            );
        } catch (\Exception $e) {
            Log::error('Delete genre error: '.$e->getMessage());
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
