<?php

namespace App\Http\Controllers\Api;

use App\Models\OrderDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class OrderDetailController
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

            $orderDetails = OrderDetail::with(['book']);
            $orderDetails= $orderDetails->paginate($request->limit??5);
            return response()->json(
                [
                'status'=>true,
                'message'=>'Get order detail list successfully',
                'data'=>$orderDetails
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
                    'message'=>'Missing input orderId',
                    'data'=>[]
                    ], 400
                );
            }

            $orderDetail = OrderDetail::where('order_id', $request->id)->with(['book','order'])->get();
            return response()->json(
                [
                'status'=>true,
                'message'=>'Get order detail by order successfully',
                'data'=>$orderDetail
                ]
            );
        } catch (\Exception $e) {
            Log::error('Get order detail by order error: '.$e->getMessage());
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
