<?php

namespace App\Traits;

trait ImageUrlFormatter
{
    public function formatImageUrl($imagePath)
    {
        $baseUrl = \App\Http\Controllers\Api\Config::getStaticString();
        return rtrim($baseUrl, '/') . '/' . ltrim($imagePath, '/');
    }

    public function formatBooksImageUrls($books)
    {
        foreach ($books as $book) {
            $book->image = $this->formatImageUrl($book->image);
        }
        return $books;
    }
}
