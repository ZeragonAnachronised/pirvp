<?php

namespace Database\Seeders;

use App\Models\Item;
use App\Models\Category;
use Illuminate\Database\Seeder;

class ItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Получаем категории
        $electronics = Category::where('slug', 'electronics')->first();
        $clothing = Category::where('slug', 'clothing')->first();
        $books = Category::where('slug', 'books')->first();
        $sports = Category::where('slug', 'sports')->first();
        $home = Category::where('slug', 'home-garden')->first();
        $beauty = Category::where('slug', 'beauty')->first();

        $items = [
            // Электроника
            [
                'name' => 'iPhone 15 Pro',
                'slug' => 'iphone-15-pro',
                'description' => 'Последнее поколение смартфонов Apple с процессором A17 Pro',
                'price' => 99999,
                'stock' => 10,
                'category_id' => $electronics->id,
            ],
            [
                'name' => 'Samsung Galaxy S24',
                'slug' => 'samsung-galaxy-s24',
                'description' => 'Флагманский смартфон Samsung с 200MP камерой',
                'price' => 89999,
                'stock' => 15,
                'category_id' => $electronics->id,
            ],
            [
                'name' => 'MacBook Pro 14"',
                'slug' => 'macbook-pro-14',
                'description' => 'Мощный ноутбук для профессионалов',
                'price' => 199999,
                'stock' => 5,
                'category_id' => $electronics->id,
            ],
            [
                'name' => 'AirPods Pro',
                'slug' => 'airpods-pro',
                'description' => 'Премиум наушники с активным подавлением шума',
                'price' => 29999,
                'stock' => 25,
                'category_id' => $electronics->id,
            ],
            [
                'name' => 'iPad Air',
                'slug' => 'ipad-air',
                'description' => 'Портативный планшет для работы и развлечений',
                'price' => 59999,
                'stock' => 12,
                'category_id' => $electronics->id,
            ],

            // Одежда
            [
                'name' => 'Футболка Nike',
                'slug' => 'futbolka-nike',
                'description' => 'Спортивная футболка из дышащей ткани',
                'price' => 2999,
                'stock' => 50,
                'category_id' => $clothing->id,
            ],
            [
                'name' => 'Джинсы Levi\'s',
                'slug' => 'dzhinsy-levis',
                'description' => 'Классические синие джинсы',
                'price' => 5999,
                'stock' => 30,
                'category_id' => $clothing->id,
            ],
            [
                'name' => 'Пальто Zara',
                'slug' => 'palto-zara',
                'description' => 'Теплое шерстяное пальто',
                'price' => 12999,
                'stock' => 8,
                'category_id' => $clothing->id,
            ],
            [
                'name' => 'Платье H&M',
                'slug' => 'plate-hm',
                'description' => 'Легкое платье на лето',
                'price' => 3999,
                'stock' => 40,
                'category_id' => $clothing->id,
            ],
            [
                'name' => 'Кроссовки Adidas',
                'slug' => 'krossovki-adidas',
                'description' => 'Удобные кроссовки для повседневной носки',
                'price' => 7999,
                'stock' => 35,
                'category_id' => $clothing->id,
            ],

            // Книги
            [
                'name' => 'Война и мир',
                'slug' => 'vojna-i-mir',
                'description' => 'Классический роман Льва Толстого',
                'price' => 1299,
                'stock' => 20,
                'category_id' => $books->id,
            ],
            [
                'name' => 'Преступление и наказание',
                'slug' => 'prestuplenie-i-nakazanie',
                'description' => 'Психологический роман Федора Достоевского',
                'price' => 1099,
                'stock' => 25,
                'category_id' => $books->id,
            ],
            [
                'name' => '1984',
                'slug' => '1984',
                'description' => 'Антиутопический роман Джорджа Оруэлла',
                'price' => 899,
                'stock' => 30,
                'category_id' => $books->id,
            ],
            [
                'name' => 'Мастер и Маргарита',
                'slug' => 'master-i-margarita',
                'description' => 'Роман Михаила Булгакова',
                'price' => 1199,
                'stock' => 22,
                'category_id' => $books->id,
            ],
            [
                'name' => 'Граф Монте-Кристо',
                'slug' => 'graf-monte-kristo',
                'description' => 'Приключенческий роман Александра Дюма',
                'price' => 1399,
                'stock' => 18,
                'category_id' => $books->id,
            ],

            // Спорт
            [
                'name' => 'Гантели 10кг',
                'slug' => 'ganteli-10kg',
                'description' => 'Пара гантелей для домашних тренировок',
                'price' => 1999,
                'stock' => 15,
                'category_id' => $sports->id,
            ],
            [
                'name' => 'Беговая дорожка',
                'slug' => 'begovaya-dorozhka',
                'description' => 'Электрическая беговая дорожка',
                'price' => 29999,
                'stock' => 4,
                'category_id' => $sports->id,
            ],
            [
                'name' => 'Коврик йоги',
                'slug' => 'kovrik-yogi',
                'description' => 'Нескользящий коврик для йоги',
                'price' => 1499,
                'stock' => 40,
                'category_id' => $sports->id,
            ],
            [
                'name' => 'Баскетбольный мяч',
                'slug' => 'basketbolnyy-myach',
                'description' => 'Профессиональный баскетбольный мяч',
                'price' => 2499,
                'stock' => 20,
                'category_id' => $sports->id,
            ],
            [
                'name' => 'Велосипед горный',
                'slug' => 'velosiped-gornyy',
                'description' => 'Горный велосипед с 21 скоростью',
                'price' => 19999,
                'stock' => 6,
                'category_id' => $sports->id,
            ],

            // Дом и сад
            [
                'name' => 'Люстра потолочная',
                'slug' => 'lyustra-potolochna',
                'description' => 'Современная светодиодная люстра',
                'price' => 4999,
                'stock' => 10,
                'category_id' => $home->id,
            ],
            [
                'name' => 'Ваза керамическая',
                'slug' => 'vaza-keramicheskaya',
                'description' => 'Красивая ваза для цветов',
                'price' => 1999,
                'stock' => 30,
                'category_id' => $home->id,
            ],
            [
                'name' => 'Подушка 50x50',
                'slug' => 'podushka-50x50',
                'description' => 'Мягкая подушка из натурального материала',
                'price' => 1299,
                'stock' => 50,
                'category_id' => $home->id,
            ],
            [
                'name' => 'Шторы на карнизе',
                'slug' => 'shtory-na-karnize',
                'description' => 'Качественные шторы темного цвета',
                'price' => 3499,
                'stock' => 12,
                'category_id' => $home->id,
            ],
            [
                'name' => 'Коврик напольный',
                'slug' => 'kovrik-napolnyy',
                'description' => 'Теплый коврик для спальни',
                'price' => 2299,
                'stock' => 25,
                'category_id' => $home->id,
            ],

            // Красота
            [
                'name' => 'Тональный крем',
                'slug' => 'tonalnyy-krem',
                'description' => 'Тональный крем с SPF защитой',
                'price' => 1599,
                'stock' => 60,
                'category_id' => $beauty->id,
            ],
            [
                'name' => 'Помада красная',
                'slug' => 'pomada-krasnaya',
                'description' => 'Классическая красная помада',
                'price' => 899,
                'stock' => 80,
                'category_id' => $beauty->id,
            ],
            [
                'name' => 'Маска для лица',
                'slug' => 'maska-dlya-lica',
                'description' => 'Питательная маска из натуральных компонентов',
                'price' => 799,
                'stock' => 100,
                'category_id' => $beauty->id,
            ],
            [
                'name' => 'Лосьон для тела',
                'slug' => 'losyon-dlya-tela',
                'description' => 'Увлажняющий лосьон с ароматом лаванды',
                'price' => 1299,
                'stock' => 70,
                'category_id' => $beauty->id,
            ],
            [
                'name' => 'Шампунь 250ml',
                'slug' => 'shampun-250ml',
                'description' => 'Профессиональный шампунь для волос',
                'price' => 699,
                'stock' => 120,
                'category_id' => $beauty->id,
            ],
        ];

        foreach ($items as $item) {
            Item::create($item);
        }
    }
}
