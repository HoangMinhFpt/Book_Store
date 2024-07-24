<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use Dotenv\Parser\Value;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController
{
    public function index(Request $request)
    {
        try{
            auth()->user();
            $products = Product::where('product_name', '!=', '');
            if(isset($request->product_name) && $request->product_name != '') {
                $products = $products->where('product_name', 'like', '%'.$request->product_name.'%');
            }
            if(isset($request->quantity) && $request->quantity != '') {
                $products = $products->where('quantity', 'like', '%'.$request->quantity.'%');
            }
            $products = $products->paginate(5);
            return response()->json(
                [
                    'status' => true,
                    'message' => 'Books list successfully',
                    'data' => $products
                ], 200
            );
            return view('admin.products.index')->with('products', $products);
        } catch (\Exception $e) {

            return response()->json(
                [
                    'status' => false,
                    'message' => 'You should login first',
                ], 500
            );
        }
    
    }
    public function create(Request $request)
    {
        try{
            auth()->user();
            $validateProduct = Validator::make(
                $request->all(), [
                    'product_name' => 'required|unique:products,product_name|max:255',
                    'quantity' => 'required|numeric',
                    'price' => 'required|decimal:0,2',
                    ]
            );
                
            if($validateProduct->fails()) {
                    
                return response()->json(
                    [
                        'status' => false,
                        'message' => 'Product list error',
                        'data' => $validateProduct->errors()
                    ], 422
                );
            }
                
                $inputData = array(
                    'product_name' => $request->product_name,
                    'quantity' => $request->quantity,
                    'price' => $request->price,
                    'description' => isset($request->description) ? $request->description : '',
                ); 
                
                $product = Product::create($inputData);
                return response()->json(
                    [
                        'status' => true,
                        'message' => 'Create product successfully',
                        'data' => $product
                    ], 200
                );
        } catch (\Exception $e) {

            return response()->json(
                [
                    'status' => false,
                    'message' => 'You should login first',
                ], 500
            );
        }
    }

    public function update(Request $request)
    {
        try{
            auth()->user();
            $validateProduct = Validator::make(
                $request->all(), [
                    'product_id'=> 'required|exists:products,id',
                    'product_name' => 'required|max:255',
                    'quantity' => 'required|numeric',
                    'price' => 'required|decimal:0,2',
                    ]
            );
                
            if($validateProduct->fails()) {
                return response()->json(
                    [
                        'status' => false,
                        'message' => `Don't update product successfully`,
                        'data' => $validateProduct->errors()
                    ], 422
                );
            }
                
                $product = Product::find($request->product_id);
                $product->product_name = $request->product_name;
                $product->quantity = $request->quantity;
                $product->price = $request->price;
                $product->description = isset($request->description) ? $request->description : '';
                $product->save();
                
                return response()->json(
                    [
                        'status' => true,
                        'message' => 'Update product successfully',
                        'data' => $product
                    ], 200
                );
        } catch (\Exception $e) {
            return response()->json(
                [
                    'status' => false,
                    'message' => 'You should login first',
                ], 500
            );
        }
    }

    public function delete(Request $request)
    {
        try{
            auth()->user();
            $validateProduct = Validator::make(
                $request->all(), [
                    'product_id'=> 'required|exists:products,id'
                    ]
            );
                
            if($validateProduct->fails()) {
                    
                return response()->json(
                    [
                        'status' => false,
                        'message' => `Didn't delete product successfully`,
                        'data' => $validateProduct->errors()
                    ], 422
                );
            }
                
                $product = Product::find($request->product_id)->delete();
                
                return response()->json(
                    [
                        'status' => true,
                        'message' => 'Deleted product successfully',
                    ], 200
                );
        } catch (\Exception $e) {

            return response()->json(
                [
                    'status' => false,
                    'message' => 'You should login first',
                ], 500
            );
        }
    }
}
