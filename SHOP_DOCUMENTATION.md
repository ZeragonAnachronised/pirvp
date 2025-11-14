# Интернет-магазин на Laravel + Inertia + React

## Описание

Полнофункциональный интернет-магазин, созданный на основе:
- **Laravel 11** - backend框架
- **Inertia.js** - монолитный JavaScript фреймворк
- **React** - UI библиотека
- **Tailwind CSS** - стилизация

## Структура проекта

### Контроллеры (`app/Http/Controllers/`)
- **ItemController** - управление товарами (каталог, поиск, фильтрация)
- **CategoryController** - работа с категориями
- **CartController** - управление корзиной
- **OrderController** - создание и управление заказами
- **ReviewController** - система отзывов и рейтинга
- **WishController** - список желаний

### Страницы (`resources/js/Pages/`)

#### Items (Товары)
- `Items/Index.jsx` - каталог товаров с фильтрацией и сортировкой
- `Items/Show.jsx` - детальная страница товара
- `Items/Search.jsx` - результаты поиска

#### Cart (Корзина)
- `Cart/Index.jsx` - просмотр и управление корзиной

#### Orders (Заказы)
- `Orders/Index.jsx` - список заказов пользователя
- `Orders/Show.jsx` - детали заказа
- `Orders/Checkout.jsx` - оформление заказа

#### Reviews (Отзывы)
- `Reviews/Index.jsx` - просмотр отзывов на товар

#### Wishes (Список желаний)
- `Wishes/Index.jsx` - список избранных товаров

#### Categories (Категории)
- `Categories/Index.jsx` - все категории
- `Categories/Show.jsx` - товары в категории

### Компоненты
- `Layouts/Layout.jsx` - главный layout с навигацией и футером

## Маршруты (Routes)

### Публичные маршруты
```
GET /items                 - каталог товаров
GET /items/search          - поиск товаров
GET /items/{id}            - детали товара
GET /categories            - все категории
GET /categories/{id}       - товары в категории
GET /reviews/{item_id}     - отзывы о товаре
GET /cart                  - корзина
POST /cart/add/{item_id}   - добавить в корзину
DELETE /cart/item/{id}     - удалить товар из корзины
```

### Защищенные маршруты (требуют авторизации)
```
GET /orders                - мои заказы
GET /orders/{id}           - детали заказа
GET /checkout              - оформление заказа
POST /orders               - создать заказ
POST /orders/{id}/cancel   - отменить заказ

GET /wishes                - список желаний
POST /wishes/add/{item_id} - добавить в желания
DELETE /wishes/{item_id}   - удалить из желаний

POST /reviews/{item_id}    - оставить отзыв
PUT /reviews/{id}          - отредактировать отзыв
DELETE /reviews/{id}       - удалить отзыв
```

## Функциональность

### Каталог товаров
- ✅ Просмотр всех товаров
- ✅ Поиск по названию и описанию
- ✅ Фильтрация по категориям
- ✅ Сортировка (новые, цена, популярность)
- ✅ Пагинация

### Управление товарами
- ✅ Детальная информация о товаре
- ✅ Изображения товара
- ✅ Проверка наличия
- ✅ Рекомендуемые товары
- ✅ Система отзывов и рейтинга

### Корзина
- ✅ Добавление/удаление товаров
- ✅ Изменение количества
- ✅ Расчет итоговой суммы
- ✅ Сохранение при авторизации

### Заказы
- ✅ Оформление заказа
- ✅ Ввод адреса доставки
- ✅ История заказов
- ✅ Отмена заказа
- ✅ Статусы заказов

### Отзывы
- ✅ Оставление отзыва (только авторизованные)
- ✅ Рейтинг с звездами (1-5)
- ✅ Среднее значение и распределение оценок
- ✅ Редактирование и удаление отзывов

### Список желаний
- ✅ Добавление в избранное
- ✅ Управление списком
- ✅ Добавление в корзину из списка

### Авторизация
- ✅ Разделение функционала на авторизованных и гостей
- ✅ Политики доступа (Policies)
- ✅ Защита приватной информации

## Установка и настройка

### 1. Создание миграций (если не созданы)
```bash
php artisan migrate
```

### 2. Установка зависимостей JavaScript
```bash
npm install
```

### 3. Построение ассетов
```bash
npm run build
```

### 4. Разработка (watch mode)
```bash
npm run dev
```

## API Примеры

### Добавление товара в корзину
```javascript
import { useForm } from '@inertiajs/react'

const { post } = useForm()

const handleAddToCart = () => {
  post(route('cart.add', itemId), {
    data: { quantity: 1 }
  })
}
```

### Поиск товаров
```javascript
const handleSearch = (query) => {
  window.location.href = `${route('items.search')}?q=${query}&sort=latest`
}
```

### Фильтрация по категории
```javascript
const handleFilterByCategory = (categoryId) => {
  window.location.href = route('items.byCategory', categoryId)
}
```

## Модели данных

### Item
```php
- id (integer, primary)
- name (string)
- slug (string)
- description (text)
- price (decimal)
- stock (integer)
- sku (string)
- category_id (foreign)
- is_active (boolean)
- is_featured (boolean)
- created_at, updated_at
- deleted_at (soft delete)
```

### Category
```php
- id (integer, primary)
- name (string)
- slug (string)
- description (text)
- parent_id (foreign, nullable)
- created_at, updated_at
- deleted_at (soft delete)
```

### Cart
```php
- id (integer, primary)
- user_id (foreign, nullable)
- session_id (string)
- status (enum: active, completed)
- total (decimal)
- created_at, updated_at
```

### Order
```php
- id (integer, primary)
- user_id (foreign)
- status (enum: pending, completed, cancelled)
- total (decimal)
- payment_status (enum: pending, paid, failed)
- shipping_address (text)
- billing_address (text)
- currency (string, default: RUB)
- created_at, updated_at
```

### Review
```php
- id (integer, primary)
- user_id (foreign)
- item_id (foreign)
- rating (integer: 1-5)
- comment (text, nullable)
- created_at, updated_at
```

### Wish
```php
- id (integer, primary)
- user_id (foreign)
- item_id (foreign)
- created_at, updated_at
```

## Таблицы стилей

- **Tailwind CSS** используется для всех стилей
- Цветовая схема: синяя (`blue-600`) в качестве основного цвета
- Адаптивный дизайн (мобильный-first)

## Безопасность

- ✅ Защита от CSRF атак
- ✅ Авторизация через Middleware
- ✅ Policies для проверки доступа
- ✅ Валидация входных данных
- ✅ SQL Injection защита через ORM

## Расширение функциональности

### Добавление нового контроллера
```php
// 1. Создать контроллер
php artisan make:controller NewController

// 2. Добавить методы
// 3. Зарегистрировать маршруты в routes/web.php
// 4. Создать Inertia компоненты в resources/js/Pages/
```

### Добавление нового маршрута
```php
Route::get('/path', [Controller::class, 'method'])->name('route.name');
```

### Создание компонента
```jsx
import React from 'react'
import { Head, Link } from '@inertiajs/react'

export default function ComponentName({ prop1, prop2 }) {
  return (
    <>
      <Head title="Title" />
      {/* Содержимое */}
    </>
  )
}
```

## Известные ограничения

1. Платежи не интегрированы (требуется добавить Stripe/YooKassa)
2. Отправка почты нужно настроить в `.env`
3. Загрузка изображений требует настройки хранилища

## Контакт и поддержка

Для вопросов и предложений создавайте issue в репозитории.

## Лицензия

Этот проект лицензирован под MIT License.
