<?php
namespace App\Http\Controllers\Api;
class Config
{
    // static $bookDomainImg = "http://10.65.4.31:1234/books/";
    static $bookDomainImg = "http://192.168.1.6:1234/books/";
  
    public static function getStaticString()
    {
        return self::$bookDomainImg;
    }
}
