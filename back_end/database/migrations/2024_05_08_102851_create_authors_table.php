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
            'authors', function (Blueprint $table) {
                $table->increments('author_id');
                $table->string('author_name')->nullable();
                $table->string('biography')->nullable();
                $table->timestamps();
            }
        );

        Schema::create(
            'genres', function (Blueprint $table) {
                $table->increments('genre_id');
                $table->string('genre_name')->nullable();
                $table->timestamps();
            }
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('genres');
        Schema::dropIfExists('authors');
    }
};
