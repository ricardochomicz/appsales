<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
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
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'price' => (float) $this->price,
            'stock' => (int) $this->stock,
            'slug' => $this->slug,
            'active' => (bool) $this->active,
            'created_at' => Carbon::parse($this->created_at)->format("d/m/Y"),
            'updated_at' => Carbon::parse($this->updated_at)->format("d/m/Y"),
        ];
    }
}
