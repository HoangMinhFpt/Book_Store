<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create(
            'books', function (Blueprint $table) {
                $table->increments('book_id');
                $table->string('title')->nullable();
                $table->unsignedInteger('author_id');
                $table->unsignedInteger('genre_id');
                $table->decimal('price');
                $table->string('image')->nullable();
                $table->string('description');
                $table->dateTime('published_date');
                $table->integer('stock_quantity')->nullable();
                $table->string('biography')->nullable();
                $table->timestamps();
            }
        );
        
        Schema::table(
            'books', function (Blueprint $table) {
                $table->foreign('author_id')->references('author_id')->on('authors')->onDelete('cascade');
                $table->foreign('genre_id')->references('genre_id')->on('genres')->onDelete('cascade');
            }
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
