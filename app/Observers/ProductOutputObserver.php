<?php

namespace App\Observers;

use App\Models\ProductOutput;

class ProductOutputObserver
{
    public function creating(ProductOutput $input)
    {
        //retorna o produto
        $product = $input->product;
        //acrescenta ao estoque 
        $product->stock -= $input->amount;
        if($product->stock < 0){
            throw new \Exception("Estoque de {$product->name} não pode ser negativo");
        }
        $product->save();      
    }
}
