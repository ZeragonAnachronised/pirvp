<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Электроника',
                'description' => 'Электронные товары и гаджеты',
                'slug' => 'electronics',
            ],
            [
                'name' => 'Одежда',
                'description' => 'Одежда для мужчин, женщин и детей',
                'slug' => 'clothing',
            ],
            [
                'name' => 'Книги',
                'description' => 'Различные жанры и авторы',
                'slug' => 'books',
            ],
            [
                'name' => 'Спорт',
                'description' => 'Спортивные товары и оборудование',
                'slug' => 'sports',
            ],
            [
                'name' => 'Дом и сад',
                'description' => 'Товары для дома и сада',
                'slug' => 'home-garden',
            ],
            [
                'name' => 'Красота',
                'description' => 'Косметика и средства ухода',
                'slug' => 'beauty',
            ],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
