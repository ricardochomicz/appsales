<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductCategoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            //recebe a instancia do produto
            'product' => new ProductResource($this->resource),
            //acessa os dados da categoria
            'categories' => CategoryResource::collection($this->resource->categories)
        ];
    }
}
