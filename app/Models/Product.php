<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes;
    //campo exclusao logica
    protected $dates = ['deleted_at'];
    protected $fillable = ['name', 'description', 'price', 'active'];

    public function categories()
    {
        //N:N muitos para muitos
        return $this->belongsToMany(Category::class);
    }

    public function photos()
    {
        return $this->hasMany(ProductPhoto::class);
    }
}
