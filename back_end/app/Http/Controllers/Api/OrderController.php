<?php

namespace App\Http\Controllers\Api;

use App\Models\Book;
use App\Models\Order;
use App\Models\OrderDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class OrderController
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

            $orders = Order::with(['user']);
            if(isset($request->user_id) && $request->user_id != '') {
                $orders = $orders->where('user_id', 'like', '%'.$request->user_id.'%');
            }
            if(isset($request->total_amount) && $request->total_amount != '') {
                $orders = $orders->where('total_amount', 'like', '%'.$request->total_amount.'%');
            }

            $orders = $orders->paginate($request->limit??5);

            return response()->json(
                [
                'status'=>true,
                'message'=>'Get order list successfully',
                'data'=>$orders
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
                    'message'=>'Missing input user_id',
                    'data'=>[]
                    ], 400
                );
            }
        
            $order = Order::where('user_id', $request->id)->with(['user'])->get();
            return response()->json(
                [
                'status'=>false,
                'message'=>'Get order by user_id successfully',
                'data'=>$order
                ], 200
            );
        } catch (\Exception $e) {
            Log::error('Get order by user_id error: '.$e->getMessage());
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

    public function checkout(Request $request)
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

            $validator = Validator::make(
                $request->all(), [
                'user_id' => 'required|exists:users,id',
                'order_date' => 'required|date_format:Y-m-d H:i:s',
                'total_amount' => 'required|numeric|regex:/^\d+(\.\d{1,2})?$/',
                'status' => 'required|string',
                'order_details' => 'required|array',
                'order_details.*.book_id' => 'required|exists:books,book_id',
                'order_details.*.quantity' => 'required|integer|min:1',
                'order_details.*.price' => 'required|numeric|regex:/^\d+(\.\d{1,2})?$/',
                'order_details.*.total' => 'required|numeric|regex:/^\d+(\.\d{1,2})?$/'
                ]
            );
    
            if ($validator->fails()) {
                return response()->json(
                    [
                    'status' => false,
                    'message' => 'Validation error',
                    'errors' => $validator->errors()
                    ], 422
                );
            }
    
            try {
                DB::beginTransaction();
    
                $customOrderId = 'ORD-' . \Carbon\Carbon::now()->format('YmdHis');
    
                $order = Order::create(
                    [
                        'order_id' => $customOrderId,
                        'user_id' => $request->user_id,
                        'order_date' => $request->order_date,
                        'total_amount' => $request->total_amount,
                        'status' => $request->status,
                        ]
                );
    
                foreach ($request->order_details as $detail) {
                    $book = Book::find($detail['book_id']);
                    if ($book->stock_quantity < $detail['quantity']) {
                        DB::rollBack();
                        return response()->json(
                            [
                            'status' => false,
                            'message' => 'Insufficient stock for book ID: ' . $detail['book_id'],
                            'data' => []
                            ], 400
                        );
                    }
        
                    $book->stock_quantity -= $detail['quantity'];
                    $book->save();
        
                    $orderDetail = OrderDetail::create(
                        [
                        'order_id' => $customOrderId, 
                        'book_id' => $detail['book_id'],
                        'quantity' => $detail['quantity'],
                        'price' => $detail['price'],
                        'total' => $detail['quantity'] * $detail['price'],
                        ]
                    );
                    Log::info('Order detail created', ['order_detail' => $orderDetail]);
                }
    
                DB::commit();
    
                return response()->json(
                    [
                    'status' => true,
                    'message' => 'Order placed successfully',
                    'data' => $order->load('order_detail')
                    ], 201
                );
    
            } catch (\Exception $e) {
                DB::rollBack();
                Log::error('Checkout error: ' . $e->getMessage());
                return response()->json(
                    [
                    'status' => false,
                    'message' => 'Order placement failed',
                    'error' => $e->getMessage()
                    ], 500
                );
            }

        } catch (\Exception $e) {
            Log::error('Get create order error: '.$e->getMessage());
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

    // public function checkout(Request $request)
    // {
    //     $validator = Validator::make($request->all(), [
    //         'user_id' => 'required|exists:users,id',
    //         'order_date' => 'required|date',
    //         'total_amount' => 'required|numeric',
    //         'status' => 'required|string',
    //         'order_details' => 'required|array',
    //         'order_details.*.book_id' => 'required|exists:books,id',
    //         'order_details.*.quantity' => 'required|integer|min:1',
    //         'order_details.*.price' => 'required|numeric',
    //     ]);

    //     if ($validator->fails()) {
    //         return response()->json([
    //             'status' => false,
    //             'message' => 'Validation error',
    //             'errors' => $validator->errors()
    //         ], 422);
    //     }

    //     try {
    //         DB::beginTransaction();

    //         $customOrderId = 'ORD-' . time();

    //         $order = Order::create([
    //             'order_id' => $customOrderId,
    //             'user_id' => $request->user_id,
    //             'order_date' => $request->order_date,
    //             'total_amount' => $request->total_amount,
    //             'status' => $request->status,
    //         ]);

    //         foreach ($request->order_details as $detail) {
    //             $book = Book::find($detail['book_id']);
    //             if ($book->stock < $detail['quantity']) {
    //                 DB::rollBack();
    //                 return response()->json([
    //                     'status' => false,
    //                     'message' => 'Insufficient stock for book ID: ' . $detail['book_id'],
    //                     'data' => []
    //                 ], 400);
    //             }
    
    //             $book->stock -= $detail['quantity'];
    //             $book->save();
    
    //             OrderDetail::create([
    //                 'order_id' => $customOrderId, 
    //                 'book_id' => $detail['book_id'],
    //                 'quantity' => $detail['quantity'],
    //                 'price' => $detail['price'],
    //                 'total' => $detail['quantity'] * $detail['price'],
    //             ]);
    //         }

    //         DB::commit();

    //         return response()->json([
    //             'status' => true,
    //             'message' => 'Order placed successfully',
    //             'data' => $order->load('orderDetails')
    //         ], 201);

    //     } catch (\Exception $e) {
    //         DB::rollBack();
    //         return response()->json([
    //             'status' => false,
    //             'message' => 'Order placement failed',
    //             'error' => $e->getMessage()
    //         ], 500);
    //     }
    // }
}
