<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    use HasFactory;

    protected $table = 'order_detail';
    protected $primaryKey = 'orders_details_id';
    public $timestamps = true;
    protected $fillable = [
        'order_id', 'book_id', 'quantity', 'price', 'total'
    ];

    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id', 'order_id');
    }

    public function book()
    {
        return $this->hasMany(Book::class, 'book_id', 'book_id');
    }
}
