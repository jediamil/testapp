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
        Schema::create('profit_calculations', function (Blueprint $table) {
            $table->id();

            $table->string('name');

            // Puhunan
            $table->decimal('cost_price', 10, 2);

            // Profit percentage
            $table->decimal('profit_percentage', 5, 2);

            // quantity
            $table->integer('quantity')->default(0);

            // basic category
            $table->string('category')->nullable();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profit_calculations');
    }
};
