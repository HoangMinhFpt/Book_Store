<?php

namespace App\Http\Controllers\Api;

use App\Models\Author;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class AuthorController
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
            
            $authors = Author::where('author_name', '!=', '');
            if(isset($request->author_name) && $request->author_name != '') {
                  $authors = $authors->where('author_name', 'like', '%'.$request->author_name.'%');
            }

            if(!$request->page) {
                $authors = Author::all();
                return response()->json(
                    [
                        'status' => true,
                        'message' => 'Get all author list successfully',
                        'data' => $authors
                    ], 201
                );
            }

            $authors = $authors->paginate($request->limit??5);
            return response()->json(
                [
                'status' => true,
                'message' => 'Get author list successfully',
                'data' => $authors
                ], 200
            );
        }catch (\Exception $e) {
            Log::error('Get author error: '.$e->getMessage());
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

            $validateAuthor= Validator::make(
                $request->all(), [
                    'author_name'=>'required|unique:authors,author_name',
                    'biography'=>'required',
                ]
            );

            if($validateAuthor->fails()) {
                return response()->json(
                    [
                    'status'=>false,
                    'message'=>'Input author missing',
                    'data'=>$validateAuthor->errors()
                    ], 422
                );
            }

            $inputData = array(
                'author_name'=>$request->author_name,
                'biography'=>$request->biography
            );

            $author = Author::create($inputData);

            return response()->json(
                [
                'status'=>true,
                'message'=>'Create author successfully',
                'data'=>$author
                ], 200
            );
        } catch (\Exception $e) {
            Log::error('Create author error: '.$e->getMessage());
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
                    'message'=>'Missing input author_id',
                    'data'=>[]
                    ], 400
                );
            } 

            $author = Author::find($request->id);

            return response()->json(
                [
                'status'=>true,
                'message'=>'Get author successfully',
                'data'=>$author
                ], 200
            );
        } catch (\Exception $e) {
            Log::error('Get a author error: '.$e->getMessage());
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

            $validateAuthor = Validator::make(
                $request ->all(), [
                    'author_name'=>'required|max:25'
                ]
            );

            if($validateAuthor->fails()) {
                return response()->json(
                    [
                    'status'=>false,
                    'message'=>'Input author missing',
                    'data'=> $validateAuthor->errors()
                    ], 400
                );
            }

            if(!$request->id) {
                return response()->json(
                    [
                    'status'=>false,
                    'message'=>'Input missing author_id',
                    'data'=>[]
                    ], 400
                );
            }

            $author = Author::find($request->id);
            $author->author_name = $request->author_name;
            $author->biography = $request->biography;
            $author->save();

            return response()->json(
                [
                'status'=>true,
                'message'=>'Update author successfully',
                'data'=>$author
                ], 200
            );
        } catch (\Exception $e) {
            Log::error('Update author error: '.$e->getMessage());
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
                    'message'=>'Missing input author_id',
                    'data'=>[]
                    ], 400
                );
            }
            $author = Author::find($request->id);
            $author->delete();
            return response()->json(
                [
                'status'=>true,
                'message'=>'Delete author successfully',
                'data'=>$author
                ], 200
            );
        } catch (\Exception $e) {
            Log::error('Delete author error: '.$e->getMessage());
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
