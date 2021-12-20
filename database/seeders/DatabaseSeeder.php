<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\ProductInput;
use App\Models\ProductPhoto;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    private $allFakerPhotos;
    private $fakerPhotosPath = 'app/faker/product_photos';
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        Category::factory(5)->create();
        $categories = Category::all();
        Product::factory(30)->create()
            ->each(function (Product $product) use ($categories) {
                $categoryId = $categories->random()->id;
                $product->categories()->attach($categoryId);
            });
        $products = Product::all();
        ProductInput::factory(200)
            ->make()
            ->each(function ($input) use ($products) {
                $product = $products->random();
                $input->product_id = $product->id;
                $input->save();
                $product->stock += $input->amount;
                $product->save();
            });
        $this->allFakerPhotos = $this->getFakerPhotos();
        $this->deleteAllPhotoInProductsPath();
        $self = $this;
        $products->each(function ($product) use ($self) {
            $self->createPhotoDir($product);
            $self->createPhotosModels($product);
        });

        User::factory(1)->create();
    }

    private function getFakerPhotos()
    {
        return collect(\File::allFiles(storage_path($this->fakerPhotosPath)));
    }

    private function deleteAllPhotoInProductsPath()
    {
        $path = ProductPhoto::PRODUCTS_PATH;
        //remove o conteudo da pasta
        \File::deleteDirectory(storage_path($path), true);
    }

    //cria o diretorio das imagens
    private function createPhotoDir(Product $product)
    {
        //cria o diretorio até o id que é o nome da pasta
        \File::makeDirectory(ProductPhoto::photosPath($product->id), 0777, true);
    }

    private function createPhotosModels(Product $product)
    {
        foreach (range(1, 3) as $v) {
            $this->createPhotoModel($product);
        }
    }

    private function createPhotoModel(Product $product)
    {
        $photo = ProductPhoto::create([
            'product_id' => $product->id,
            'file_name' => 'imagem.png'
        ]);
        $this->generatePhoto($photo);
    }

    private function generatePhoto(ProductPhoto $photo)
    {
        $photo->file_name = $this->uploadPhoto($photo->product_id);
        $photo->save();
    }

    private function uploadPhoto($productId)
    {
        $photoFile = $this->allFakerPhotos->random();
        $uploadFile = new UploadedFile(
            $photoFile->getRealPath(),
            Str::random(16) . '.' . $photoFile->getExtension()
        );
        ProductPhoto::uploadFiles($productId, [$uploadFile]);
        return $uploadFile->hashName();
    }
}
