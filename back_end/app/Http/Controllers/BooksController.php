<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BooksController extends Controller
{
    public function index()
    {

        $books = Book::all();
        dd($books);
        return view('admin.books.index')->with('books', $books);
    }
}
