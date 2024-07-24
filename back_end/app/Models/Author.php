<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    use HasFactory;

    protected $table = 'authors';
    protected $primaryKey = 'author_id';
    public $timestamps = true;
    protected $fillable = ['author_name', 'biography'];

    public function books()
    {
        return $this->hasMany(Book::class, 'author_id', 'author_id');
    }

}
