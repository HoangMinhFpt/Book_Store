<?php

namespace App\Http\Controllers\Api;

use App\Models\Book;
use App\Http\Controllers\Api\Config;
use App\Traits\ImageUrlFormatter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class BookController
{
    use ImageUrlFormatter;

    public function search(Request $request)
    {
        try {
            $user=auth()->user();
            if(!$user) {
                return response()->json(
                    [
                        'status' => false,
                        'message' => 'You should login first',
                    ], 401
                );
            }

            $query = $request->input('query');

            if (!$query) {
                return response()->json(
                    [
                    'status' => false,
                    'message' => 'Query parameter is missing',
                    'data' => []
                    ], 400
                );
            }

            $books = Book::where('title', 'LIKE', "%{$query}%")
                ->orWhere('author_id', 'LIKE', "%{$query}%")
                ->orWhere('genre_id', 'LIKE', "%{$query}%")
                ->get();
            $books = $this->formatBooksImageUrls($books);

            return response()->json(
                [
                'status' => true,
                'message' => 'Books retrieved successfully',
                'data' => $books
                ], 200
            );

        } catch (\Exception $e) {
            Log::error('Search book error: '.$e->getMessage());
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
    
    public function index(Request $request)
    {
        try {
            $user=auth()->user();
            if(!$user) {
                return response()->json(
                    [
                        'status' => false,
                        'message' => 'You should login first',
                    ], 401
                );
            }

            $books = Book::where('title', '!=', '')->with(['author', 'genre']);

            if(isset($request->title) && $request->title != '') {
                $books = $books->where('title', 'like', '%'.$request->title.'%');
            }
            if(isset($request->stock_quantity) && $request->stock_quantity != '') {
                $books = $books->where('stock_quantity', 'like', '%'.$request->stock_quantity.'%');
            }

            // if(isset($request->authors) && $request->authors != '') {
            //     $books = $books->where('author_id', 'in', '('.$request->authors.')');
            // }
            // if(isset($request->genres) && $request->genres != '') {
            //     $books = $books->where('genre_id', 'in', '('.$request->genres.')');
            // }

            // if ($request->authors) {
            //     $books = Book::whereIn('author_id', $request->authors)->get();
            // }
                
            // if ($request->genres) {
            //         $books=Book::whereIn('genre_id', $request->genres)->get();
            // }
                    
            if(!$request->page) {
                $books = Book::all();
                $books = $this->formatBooksImageUrls($books);
                
                return response()->json( 
                    [
                        'status' => true,
                        'message' => 'Get all book list successfully',
                        'data' =>$books,
                    ], 201
                );
            }

            if($request->sortBook) {
                switch ($request->sortBook) {
                case '2':
                    $books= Book::orderBy('price', 'asc');
                    break;
                case '3':
                    $books= Book::orderBy('price', 'desc');
                    break;
                // case '1':
                //     $books= Book::orderBy('price', 'asc');
                //     break;
                    
                default:
                    break;
                }
                    // Log::info('Get book sort: ', ['Get book sort: '=>$books]);
                    $books = $books->paginate($request->limit?? 5);
                    $books->getCollection()->transform(
                        function ($book) {
                            $book->image = $this->formatImageUrl($book->image);
                            return $book;
                        }
                    );
                    
                    return response()->json(
                        [
                        'status' => true,
                        'message' => 'Sort books list successfully',
                        'data' =>($books)
                        ], 200
                    );
            }
            
            $books = $books->paginate($request->limit?? 5);
            Log::info('Get book filter: ', ['Get book filter: '=>$books]);
            $books->getCollection()->transform(
                function ($book) {
                    $book->image = $this->formatImageUrl($book->image);
                    return $book;
                }
            );

            return response()->json(
                [
                'status' => true,
                'message' => 'Books list successfully',
                'data' =>($books)
                ], 200
            );
        } catch (\Exception $e) {
            Log::error('Get book error: '.$e->getMessage());
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


    public function create(Request $request)
    {
        try{
            $user = auth()->user();
            if(!$user) {
                return response()->json(
                    [
                    'status' => false,
                    'message' => 'You should login first',
                    ], 401
                );
            }
            $validateBook = Validator::make(
                $request->all(), [
                    'title' => 'required|unique:books,title|max:255',
                    'price' => 'required|decimal:0,2',
                    'stock_quantity' => 'required|numeric',
                    'image'=>'required'
                    ]
            );
                
            if($validateBook->fails()) {
                return response()->json(
                    [
                        'status' => false,
                        'message' => 'Missing input book',
                        'data' => $validateBook->errors()
                    ], 422
                );
            }
                Log::info('Create error book: ', ['create book error' =>$request]);
            $image = $request->image;
            $image = str_replace('data:image/png;base64,', '', $image);
            $image = str_replace('data:image/jpeg;base64,', '', $image);
            $image = str_replace('data:image/jpg;base64,', '', $image);
            $image = str_replace(' ', '+', $image);
            $imageName = $request->title.'.'.time() . '.png';

            if (!File::exists(public_path('images'))) {
                File::makeDirectory(public_path('images'), 0755, true);
            }

            File::put(('D:\\Pic\images\books\\')  . $imageName, base64_decode($image));
                $inputData = array(
                    'title' => $request->title,
                    'author_id' => $request->author_id,
                    'genre_id' => $request->genre_id,
                    'price' => $request->price,
                    'image'=>$imageName,
                    'description' => isset($request->description) ? $request->description : '',
                    'published_date' => $request->published_date,
                    'stock_quantity' => $request->stock_quantity,
                    'biography'=>isset($request->biography) ? $request->biography : '',
                ); 
                
                $book = Book::create($inputData);
                $book->load(['author', 'genre']);

                Log::info('Create book: ', ['create book' =>$inputData]);

                return response()->json(
                    [
                        'status' => true,
                        'message' => 'Create book successfully',
                        'data' => $book
                    ], 200
                );
        } catch (\Exception $e) {
            Log::error('Creating book error: '.$e->getMessage());
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
                    'message'=>'Missing input book_id',
                    'data'=>[]
                    ], 400
                );
            }

                $book = Book::find($request->id);
            if (!$book) {
                return response()->json(
                    [
                        'status' => false,
                        'message' => 'Book not found',
                        'data' => []
                    ],
                    404
                );
            }
    
                $book->load(['author', 'genre']);
                $book->image = $this->formatImageUrl($book->image);

                return response()->json(
                    ['status' => true,
                    'message' => 'Get book successfully', 
                    'data' => $book
                    ], 200
                );
        } catch (\Exception $e) {
            Log::error('Get book error: '.$e->getMessage());
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

    public function getByAuthor(Request $request)
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

            if(!$request->author_id) {
                return response()->json(
                    [
                    'status'=>false,
                    'message'=>'Missing input author_id',
                    'data'=>[]
                    ], 400
                );
            }

            $books = Book::where('author_id', $request->author_id)->with(['author', 'genre'])->get();
            $books->image = $this->formatBooksImageUrls($books);
            return response()->json(
                [
                'status'=>true,
                'message'=>'Get book by author_id successfully',
                'data'=>$books
                ], 200
            );
        } catch (\Exception $e) {
            Log::error('Get book by author_id: '.$e->getMessage());
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

    public function getByGenre(Request $request)
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

            if(!$request->genre_id) {
                return response()->json(
                    [
                    'status'=>false,
                    'message'=>'Missing input genre_id',
                    'data'=>[]
                    ], 400
                );
            }

            $books = Book::where('genre_id', $request->genre_id)->with(['author', 'genre'])->get();
            $books->image = $this->formatBooksImageUrls($books);
            return response()->json(
                [
                'status'=>true,
                'message'=>'Get book by genre_id successfully',
                'data'=>$books
                ], 200
            );
        } catch (\Exception $e) {
            Log::error('Get book by genre_id: '.$e->getMessage());
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

    public function update(Request $request )
    {
        try{
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
                    'message'=>'Missing input book_id',
                    'data'=>[]
                    ], 400
                );
            }
            
            $validateBook = Validator::make(
                $request->all(), [
                    'title' => 'required|max:255',
                    'price' => 'required|decimal:0,2',
                    'stock_quantity' => 'required|numeric',
                    'image'=>'required'
                    ]
            );
                
            if($validateBook->fails()) {
                return response()->json(
                    [
                        'status' => false,
                        'message' => 'Input book missing',
                        'data' => $validateBook->errors()
                    ], 400
                );
            }

            $image = $request->image;
            $image = str_replace('data:image/png;base64,', '', $image);
            $image = str_replace('data:image/jpeg;base64,', '', $image);
            $image = str_replace('data:image/jpg;base64,', '', $image);
            $image = str_replace(' ', '+', $image);
            $imageName = $request->title.'.'.time() . '.png';

            if (!File::exists(public_path('images'))) {
                File::makeDirectory(public_path('images'), 0755, true);
            }

            File::put(('D:\\Pic\images\books\\')  . $imageName, base64_decode($image));

            $book = Book::find($request->id);
            $book->title = $request->title;
            $book->author_id = $request->author_id;
            $book->genre_id = $request->genre_id;
            $book->price = $request->price;
            $book->image = $imageName;
            $book->description = isset($request->description) ? $request->description : '';
            $book->published_date = $request->published_date;
            $book->stock_quantity = $request->stock_quantity;
            $book->biography = isset($request->biography) ? $request->biography : '';
            $book->save();
            $book=Book::with('author', 'genre')->findOrFail($request->id);

            return response()->json(
                [
                'status' => true,
                'message' => 'Update book successfully',
                'data' => $book
                ], 200
            );
        } catch (\Exception $e) {
            Log::error('Update book error: '.$e->getMessage());
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
                    'message'=>'Missing input book_id',
                    'data'=>[]
                    ], 400
                );
            }

            $book = Book::find($request->id);
            $book->delete();
            
            return response()->json(
                [
                'status' => true,
                'message' => 'Delete book successfully',
                'data' => $book
                ], 200
            );
        } catch (\Exception $e) {
            Log::error('Delete book error: '.$e->getMessage());
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
