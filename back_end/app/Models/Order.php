<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $table = 'order';
    // protected $primaryKey = 'order_id';
    // protected $keyType = 'string';
    public $timestamps = true;
    protected $fillable = [
        'order_id','user_id', 'order_date', 'total_amount', 'status'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, "user_id", 'id');
    }

    public function order_detail()
    {
        return $this->hasMany(OrderDetail::class, 'order_id', 'order_id');
    }
}
