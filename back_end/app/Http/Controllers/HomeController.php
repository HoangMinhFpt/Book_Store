<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        return view('admin.layouts.app');
    }

    public function home()
    {
        return view('admin.dashboard');
    }
}
