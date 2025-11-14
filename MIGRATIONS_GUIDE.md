# 🗄️ Инструкция по миграциям и синхронизации моделей

## 📋 Проверка существующих миграций

Все необходимые миграции уже созданы:

```
✅ 0001_01_01_000000_create_users_table.php
✅ 0001_01_01_000001_create_cache_table.php
✅ 0001_01_01_000002_create_jobs_table.php
✅ 2025_11_14_142233_create_items_table.php
✅ 2025_11_14_142258_create_carts_table.php
✅ 2025_11_14_142326_create_wishes_table.php
✅ 2025_11_14_142359_create_feeds_table.php
✅ 2025_11_14_143000_create_categories_table.php
✅ 2025_11_14_143010_create_item_images_table.php
✅ 2025_11_14_143020_create_cart_items_table.php
✅ 2025_11_14_143030_create_orders_table.php
✅ 2025_11_14_143040_create_order_items_table.php
✅ 2025_11_14_143050_create_reviews_table.php
```

## 🚀 Запуск миграций

### Шаг 1: Подготовка окружения

Создайте файл `.env` на основе `.env.example`:
```bash
cp .env.example .env
```

Отредактируйте `.env`:
```env
DB_CONNECTION=mysql          # или postgresql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=pirvp_shop
DB_USERNAME=root
DB_PASSWORD=
```

### Шаг 2: Генерация APP_KEY

```bash
php artisan key:generate
```

### Шаг 3: Запуск миграций

```bash
# Запустить все миграции
php artisan migrate

# С выводом SQL запросов
php artisan migrate --verbose

# Откатить все и запустить заново (ВНИМАНИЕ: удалит данные!)
php artisan migrate:refresh

# Откатить последнюю миграцию
php artisan migrate:rollback

# Откатить определенное количество миграций
php artisan migrate:rollback --step=3

# Проверить статус миграций
php artisan migrate:status
```

## 📊 Структура таблиц

### users
```
id (primary key)
name (string)
email (string, unique)
email_verified_at (timestamp, nullable)
password (string)
remember_token (string, nullable)
created_at (timestamp)
updated_at (timestamp)
```

### items
```
id (primary key)
name (string)
slug (string, unique)
description (text)
price (decimal: 10,2)
stock (integer)
sku (string, unique)
category_id (foreign → categories.id)
is_active (boolean, default: true)
is_featured (boolean, default: false)
created_at (timestamp)
updated_at (timestamp)
deleted_at (timestamp, nullable) - soft delete
```

### categories
```
id (primary key)
name (string)
slug (string, unique)
description (text, nullable)
parent_id (integer, nullable) - иерархия
created_at (timestamp)
updated_at (timestamp)
deleted_at (timestamp, nullable) - soft delete
```

### carts
```
id (primary key)
user_id (foreign → users.id, nullable)
session_id (string) - для гостей
status (enum: active, completed, default: active)
total (decimal: 10,2)
created_at (timestamp)
updated_at (timestamp)
```

### cart_items
```
id (primary key)
cart_id (foreign → carts.id)
item_id (foreign → items.id)
quantity (integer)
price (decimal: 10,2)
created_at (timestamp)
updated_at (timestamp)
```

### orders
```
id (primary key)
user_id (foreign → users.id)
status (enum: pending, completed, cancelled, default: pending)
total (decimal: 10,2)
payment_status (enum: pending, paid, failed, default: pending)
shipping_address (text)
billing_address (text)
currency (string, default: RUB)
created_at (timestamp)
updated_at (timestamp)
```

### order_items
```
id (primary key)
order_id (foreign → orders.id)
item_id (foreign → items.id)
quantity (integer)
price (decimal: 10,2)
created_at (timestamp)
updated_at (timestamp)
```

### reviews
```
id (primary key)
user_id (foreign → users.id)
item_id (foreign → items.id)
rating (integer: 1-5)
comment (text, nullable)
created_at (timestamp)
updated_at (timestamp)
```

### wishes
```
id (primary key)
user_id (foreign → users.id)
item_id (foreign → items.id)
created_at (timestamp)
updated_at (timestamp)
```

### item_images
```
id (primary key)
item_id (foreign → items.id)
path (string)
created_at (timestamp)
updated_at (timestamp)
```

## 📝 Создание тестовых данных (Seeding)

### Создание Seeder'а

```bash
php artisan make:seeder ItemSeeder
```

### Пример ItemSeeder:

```php
<?php

namespace Database\Seeders;

use App\Models\Item;
use App\Models\Category;
use Illuminate\Database\Seeder;

class ItemSeeder extends Seeder
{
    public function run(): void
    {
        // Создать категории
        $categories = [
            Category::create([
                'name' => 'Электроника',
                'slug' => 'electronics',
                'description' => 'Электронные товары'
            ]),
            Category::create([
                'name' => 'Книги',
                'slug' => 'books',
                'description' => 'Художественная и деловая литература'
            ]),
        ];

        // Создать товары
        foreach ($categories as $category) {
            for ($i = 1; $i <= 10; $i++) {
                Item::create([
                    'name' => "Товар {$category->name} #{$i}",
                    'slug' => "item-{$category->slug}-{$i}",
                    'description' => "Описание товара {$i}",
                    'price' => rand(1000, 50000) / 100,
                    'stock' => rand(0, 100),
                    'sku' => "SKU-{$category->id}-{$i}",
                    'category_id' => $category->id,
                    'is_active' => true,
                    'is_featured' => $i <= 3,
                ]);
            }
        }
    }
}
```

### Запуск Seeder'а

```bash
# Запустить все seeder'ы
php artisan db:seed

# Запустить конкретный seeder
php artisan db:seed --class=ItemSeeder

# Запустить с миграциями
php artisan migrate:fresh --seed
```

## 🔄 Синхронизация Eloquent моделей

Все модели уже синхронизированы с таблицами.

### Проверка отношений между моделями:

```php
// User → Orders
$user->orders;

// User → Wishes
$user->wishes;

// Order → Items (через OrderItem)
$order->items;

// Item → Category
$item->category;

// Item → Images
$item->images;

// Item → Reviews
$item->reviews;

// Item → Orders (через OrderItem)
$item->orderItems;
```

## ⚙️ Откатывание миграций

### Откатить последнюю миграцию:
```bash
php artisan migrate:rollback
```

### Откатить все миграции:
```bash
php artisan migrate:reset
```

### Откатить и запустить заново:
```bash
php artisan migrate:refresh
```

### Откатить, запустить заново и заполнить:
```bash
php artisan migrate:refresh --seed
```

## 🐛 Решение проблем с миграциями

### Ошибка: "Base table or view already exists"
```bash
# Откатить все миграции
php artisan migrate:reset

# Запустить заново
php artisan migrate
```

### Ошибка: "Unknown database"
Убедитесь, что БД создана:
```bash
# MySQL
mysql -u root -p -e "CREATE DATABASE pirvp_shop CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

### Ошибка: "Connection refused"
Проверьте, что БД сервер запущен:
```bash
# Проверить статус MySQL
sudo service mysql status

# Запустить MySQL
sudo service mysql start
```

### Ошибка: "SQLSTATE[42000]: Syntax error"
Проверьте версию PHP и MySQL - они должны быть совместимы.

## 📊 Полезные команды

```bash
# Просмотр всех миграций и их статус
php artisan migrate:status

# Создать новую миграцию
php artisan make:migration create_new_table

# Создать миграцию для существующей таблицы
php artisan make:migration add_column_to_table --table=table_name

# Просмотр текущего статуса БД
php artisan tinker
DB::table('users')->get();
```

## ✅ Финальная проверка

После запуска всех миграций проверьте наличие таблиц:

```bash
php artisan tinker

# Проверить количество таблиц
DB::connection()->getDoctrineConnection()->getSchemaManager()->listTableNames();

# Проверить конкретную таблицу
DB::table('items')->count();
```

## 🎯 Рекомендуемый порядок

1. ✅ Создать базу данных
2. ✅ Заполнить `.env` файл
3. ✅ Запустить `php artisan key:generate`
4. ✅ Запустить `php artisan migrate`
5. ✅ (Опционально) Запустить `php artisan db:seed`
6. ✅ Проверить таблицы в БД

---

**Примечание**: Все миграции уже созданы и готовы к использованию. Вам нужно только запустить их командой `php artisan migrate`.
