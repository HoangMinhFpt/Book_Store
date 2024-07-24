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
            'orders_details', function (Blueprint $table) {
                $table->increments('orders_details_id'); 
                $table->unsignedInteger('order_id');
                $table->foreign('order_id')->references('order_id')->on('orders')->onDelete('cascade');
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
        Schema::dropIfExists('orders_details');
    }
};
