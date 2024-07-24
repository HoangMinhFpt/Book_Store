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
            'order', function (Blueprint $table) {
                $table->string('order_id', 255)->primary();
                $table->unsignedBigInteger('user_id');
                $table->dateTime('order_date');
                $table->decimal('total_amount');
                $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
                $table->string('status');
                $table->timestamps();
            }
        );

        Schema::create(
            'order_detail', function (Blueprint $table) {
                $table->increments('orders_details_id'); 
                $table->string('order_id', 255);
                $table->foreign('order_id')->references('order_id')->on('order')->onDelete('cascade');
                $table->unsignedInteger('book_id');
                $table->foreign('book_id')->references('book_id')->on('books')->onDelete('cascade');
                $table->integer('quantity');
                $table->decimal('price');
                $table->decimal('total');
                $table->timestamps();
            }
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_detail');
        Schema::dropIfExists('order');
    }
};
