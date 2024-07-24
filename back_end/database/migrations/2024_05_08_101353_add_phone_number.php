<?php

use GuzzleHttp\Promise\Create;
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
        Schema::table(
            'users', function (Blueprint $table) {
                $table->string('phone_number');
                $table->string('address');
            }
        );

        Schema::create(
            'orders', function (Blueprint $table) {
                $table->increments('order_id');
                $table->unsignedBigInteger('user_id');
                $table->dateTime('order_date');
                $table->decimal('total_amount');
                $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            }
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table(
            'users', function (Blueprint $table) {
                $table->dropColumn('phone_number');
                $table->dropColumn('address');
            }
        );

        Schema::dropIfExists('orders');
    }
};
