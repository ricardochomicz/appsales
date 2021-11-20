<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductPhotoResource extends JsonResource
{
    private $isCollection;

    public function __construct($resource, $isCollection = false) {
        parent::__construct($resource);
        $this->isCollection = $isCollection;
    }
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $data = [
            'id' => $this->id,
            'photo_url' => $this->photo_url
        ];
        if(!$this->isCollection){
            $data['product'] = new ProductResource($this->product);
        }
        return $data;
    }
}
