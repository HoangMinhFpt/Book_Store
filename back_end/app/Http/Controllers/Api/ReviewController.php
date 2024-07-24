<?php

namespace App\Http\Controllers\Api;

use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class ReviewController
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

            $reviews = Review::with(['user', 'book']);
            
            $reviews = $reviews->paginate($request->limit??5);
            return response()->json(
                [
                    'status'=>true,
                    'message'=>'Reviews list successfully!',
                    'data'=>$reviews
                ], 200
            );
        } catch (\Exception $e) {
            Log::error('Get order list error: '.$e->getMessage());
            return response()->json(
                [
                'status'=>false,
                'message'=>'An error occurred',
                'error'=>$e->getMessage(),
                'data'=>[]
                ], 500
            );
        }
    }

    public function getByBook(Request $request)
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
            if(!$request->book_id) {
                return response()->json(
                    [
                    'status'=>false,
                    'message'=>'Missing input book_id',
                    'data'=>[]
                    ], 400
                );
            }

            $review = Review::where('book_id', $request->book_id)
                ->with(['book', 'user'])
                ->orderBy('review_date', 'desc')
                ->get();
            if($review->isEmpty()) {
                return response()->json(
                    [
                    'status'=>false,
                    'message'=>'Does not exist book_id',
                    'data'=>[]
                    ], 400
                );
            }

            return response()->json(
                [
                'status'=>true,
                'message'=>'Get review by book successfully',
                'data'=>$review
                ], 200
            );
        } catch (\Exception $e) {
            Log::error('Get review by book error: '.$e->getMessage());
            return response()->json(
                [
                'status'=>false,
                'message'=>'An error occurred',
                'error'=>$e->getMessage(),
                'data'=>[]
                ], 500
            );
        }
    }

    public function getByUser(Request $request)
    {
        try {
            auth()->user();
            if(!$request->user_id) {
                return response()->json(
                    [
                    'status'=>false,
                    'message'=>'Missing input user_id',
                    'data'=>[]
                    ], 400
                );
            }

            $review = Review::where("user_id", $request->user_id)->with(['book', 'user'])->get();

            if($review->isEmpty()) {
                return response()->json(
                    [
                    'status'=>false,
                    'message'=>'Does not exist user_id',
                    'data'=>[]
                    ], 400
                );
            }

            return response()->json(
                [
                'status'=>true,
                'message'=>"Get review by user successfully",
                'data'=>$review
                ], 200
            );
        } catch (\Throwable $th) {
            return response()->json(
                [
                'status'=>false,
                'message'=>'You should login first'
                ], 401
            );
        }
    }

    public function create(Request $request)
    {
        try {
            $user= auth()->user();
            if(!$user) {
                return response()->json(
                    [
                    'status'=>false,
                    'message'=>'You should login first',
                    'data'=>[]
                    ], 401
                );
            }

            if(!$request->user_id || !$request->book_id) {
                return response()->json(
                    [
                    'status'=>false,
                    'message'=>'Missing input user_id, book_id',
                    'data'=>[]
                    ], 400
                );
            }

            $existingReview = Review::where('user_id', $request->user_id)
                                ->where('book_id', $request->book_id)
                                ->first();

            if ($existingReview) {
                return response()->json(
                    [
                        'status' => false,
                        'message' => 'You have already rated this book',
                        'data' => []
                    ], 409
                );
            }

            $validateReview = Validator::make(
                $request->all(), [
                    'rating'=>'required|numeric|min:1|max:5'
                ]
            );

            if($validateReview->fails()) {
                return response()->json(
                    [
                    'status'=>false,
                    'message'=>'Missing input review',
                    'data'=>$validateReview->errors()
                    ], 422
                );
            }

            $currentDatetime = date('Y-m-d H:i:s');
            $inputData = array(
                'user_id'=>$request->user_id,
                'book_id'=>$request->book_id,
                'rating'=>$request->rating,
                'review_text'=>isset($request->review_text)?$request->review_text:'',
                'review_date'=>$currentDatetime
            );

            Log::info('creating review: ', ['create review: ' =>$inputData]);
            $review = Review::create($inputData);
            $review->load(['user','book']);

            return response()->json(
                [
                'status'=>true,
                'message'=>'Create review successfully',
                'data'=>$review
                ], 200
            );
        } catch (\Exception $e) {
            Log::error('Error creating review: '.$e->getMessage());
            return response()->json(
                [
                'status'=>false,
                'message'=>'An error occurred',
                'eror'=>$e->getMessage(),
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

            if (!$request->user_id || !$request->book_id) {
                return response()->json(
                    [
                        'status' => false,
                        'message' => 'Missing input user_id, book_id',
                        'data' => []
                    ], 400
                );
            }
            
            $validateReview = Validator::make(
                $request->all(), [
                'rating'=>'required|numeric|min:1|max:5',
                ]
            );

            if($validateReview->fails()) {
                return response()->json(
                    [
                    'status'=>false,
                    'message'=>'Input missing review',
                    'data'=>$validateReview->errors()
                    ], 400
                );
            }

            $currentDatetime = date('Y-m-d H:i:s');
            $review = Review::where('user_id', $request->user_id)->where('book_id', $request->book_id)->first();
           
            if(!$review) {
                return response()->json(
                    [
                    'status'=>false,
                    'message'=>'There is no review that matches the parameter',
                    'data'=>[]
                    ]
                );
            }
            
            $review->user_id=$request->user_id;
            $review->book_id=$request->book_id;
            $review->rating=$request->rating;
            $review->review_text=isset($request->review_text)?$request->review_text:'';
            $review->review_date=$currentDatetime;

            $review->save();
            $review->load(['user', 'book']);

            return response()->json(
                [
                'status'=>true,
                'message'=>'Update review successfully',
                'data'=>$review
                ], 200
            );

        } catch (\Exception $e) {
            Log::error('Update review error: '.$e->getMessage());
            return response()->json(
                [
                'status'=>false,
                'message'=>'An error occurred',
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

            if (!$request->user_id || !$request->book_id) {
                return response()->json(
                    [
                        'status' => false,
                        'message' => 'Missing input user_id, book_id',
                        'data' => []
                    ], 400
                );
            }

            $review = Review::where('user_id', $request->user_id)->where('book_id', $request->book_id)->first();

            if(!$review) {
                return response()->json(
                    [
                    'status'=>false,
                    'message'=>'There is no review that matches the parameter',
                    'data'=>[]
                    ]
                );
            }
            
            $review->delete();

            return response()->json(
                [
                'status'=>true,
                'message'=>'Delete review successfully',
                'data'=>$review
                ], 200
            );
        } catch (\Exception $e) {
            Log::error('Delete review error: '.$e->getMessage());
            return response()->json(
                [
                'status'=>false,
                'message'=>'An error occurred',
                'error'=>$e->getMessage(),
                'data'=>[]
                ], 500
            );
        }
    }
}
