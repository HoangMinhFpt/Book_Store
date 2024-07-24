<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $table='books';
    protected $primaryKey = 'book_id';
    public $timestamps = true;
    protected  $fillable = [
        'title', 'author_id', 'genre_id', 'published_date', 'description', 'image', 'price', 'stock_quantity'
    ];

    public function author()
    {
        return $this->belongsTo(Author::class, 'author_id', 'author_id');
    }

    public function genre()
    {
        return $this->belongsTo(Genre::class, 'genre_id', 'genre_id');
    }

    public function review()
    {
        return $this ->hasMany(Review::class, 'book_id', 'book_id');
    }

    public function order_detail()
    {
        return $this->belongsTo(OrderDetail::class, 'orders_details_id', 'orders_details_id');
    }
}
