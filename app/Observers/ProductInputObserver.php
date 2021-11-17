<?php

namespace App\Observers;

use App\Models\Product;
use App\Models\ProductInput;

class ProductInputObserver
{
    public function creating(ProductInput $input)
    {
        //retorna o produto
        $product = $input->product;
        //acrescenta ao estoque 
        $product->stock += $input->amount;
        $product->save();      
    }
}
