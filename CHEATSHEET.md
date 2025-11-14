# 📌 Шпаргалка разработчика

## 🚀 Быстрый старт (в одной команде)
```bash
npm install && php artisan migrate && php artisan serve &  && npm run dev
```

## 📍 Где что находится?

| Функция | Файл |
|---------|------|
| Товары | `ItemController.php`, `/items` |
| Категории | `CategoryController.php`, `/categories` |
| Корзина | `CartController.php`, `/cart` |
| Заказы | `OrderController.php`, `/orders` |
| Отзывы | `ReviewController.php`, `/reviews` |
| Желания | `WishController.php`, `/wishes` |

## 🛣️ Маршруты

### Товары
```
GET  /items                   - список
GET  /items/{id}              - детали
GET  /items/search?q=...      - поиск
```

### Корзина
```
GET  /cart                     - просмотр
POST /cart/add/{id}            - добавить
DELETE /cart/item/{id}         - удалить
```

### Заказы (требуется auth)
```
GET  /orders                   - история
GET  /orders/{id}              - детали
GET  /checkout                 - оформление
POST /orders                   - создать
```

### Категории
```
GET  /categories               - все
GET  /categories/{id}          - товары
```

## 🎨 React компоненты

### Импорт Inertia
```javascript
import { Head, Link, useForm, usePage } from '@inertiajs/react'
```

### Создать компонент
```jsx
export default function MyComponent({ prop1, prop2 }) {
  const { auth, flash } = usePage().props
  const { post, processing, errors } = useForm()

  return (
    <>
      <Head title="Заголовок" />
      <div>Содержимое</div>
    </>
  )
}
```

### Отправить форму
```javascript
post(route('controller.method', id), {
  data: { field: value },
  onSuccess: () => { /* ... */ },
  onError: (errors) => { /* ... */ }
})
```

### Навигация
```javascript
<Link href={route('items.show', id)}>Товар</Link>
```

## 🔐 Авторизация

### Проверить авторизацию
```javascript
const { auth } = usePage().props
if (auth.user) { /* авторизован */ }
```

### Защитить маршрут
```php
Route::middleware('auth')->group(function () {
  Route::get('/orders', [OrderController::class, 'index']);
});
```

### Проверить права через Policy
```php
$this->authorize('view', $order);
```

## 💾 Модели и Relationships

### Получить данные
```php
Item::with(['category', 'images'])->paginate(12)
Order::where('user_id', auth()->id())->get()
User::find(1)->orders
```

### Создать запись
```php
Item::create([
  'name' => 'Товар',
  'price' => 100.00,
  'category_id' => 1
])
```

### Обновить запись
```php
$item->update(['name' => 'Новое имя'])
```

### Удалить запись
```php
$item->delete()  // Soft delete
$item->forceDelete()  // Permanent
```

## 🎯 Частые операции

### Добавить товар в корзину
```javascript
post(route('cart.add', itemId), {
  data: { quantity: 1 }
})
```

### Оставить отзыв
```javascript
post(route('reviews.store', itemId), {
  data: {
    rating: 5,
    comment: 'Отличный товар!'
  }
})
```

### Добавить в список желаний
```javascript
post(route('wishes.add', itemId))
```

### Получить текущего пользователя
```php
auth()->user()  // В контроллере
// Или
usePage().props.auth.user  // В React
```

## 📊 Пагинация

### В контроллере
```php
$items = Item::paginate(12)
return Inertia::render('Items/Index', ['items' => $items])
```

### В компоненте
```jsx
{items.data.map(item => <div key={item.id}>{item.name}</div>)}

{/* Pagination */}
{items.links.map(link => (
  link.url ? (
    <a href={link.url} className={link.active ? 'font-bold' : ''}>
      {link.label}
    </a>
  ) : (
    <span>{link.label}</span>
  )
))}
```

## ⚠️ Ошибки и решения

| Ошибка | Решение |
|--------|---------|
| CSRF mismatch | Проверьте session в `.env` |
| Route not found | Проверьте `routes/web.php` |
| Component not found | Проверьте путь и регистр букв |
| Cannot find module | Запустите `npm install` |
| Database connection error | Проверьте `.env` и БД сервер |

## 🔍 Отладка

### Посмотреть запросы
```php
DB::enableQueryLog();
// код
dd(DB::getQueryLog());
```

### REPL для экспериментов
```bash
php artisan tinker
>>> User::all()
>>> Item::find(1)
>>> exit
```

### Логирование
```php
Log::info('Message', ['data' => $data])
// Посмотреть: storage/logs/laravel.log
```

### React console
```javascript
console.log(props)  // Посмотреть props
usePage().props     // Все shared props
```

## 🎯 Tailwind CSS классы

### Расстояние
```
p-4        padding
m-4        margin
gap-4      gap между элементами
```

### Сетка
```
grid grid-cols-1           - 1 колона
grid grid-cols-2 lg:grid-cols-4  - responsive
```

### Цвета
```
bg-emerald-600      background
text-white       текст
border-gray-300  граница
```

### Размеры
```
w-full           ширина 100%
h-48             высота
rounded-lg       скругленные углы
```

## 📝 Быстрые шаблоны

### Компонент списка
```jsx
export default function List({ items }) {
  return (
    <div className="space-y-4">
      {items.data?.map(item => (
        <div key={item.id} className="bg-violet p-4 rounded shadow">
          {item.name}
        </div>
      ))}
    </div>
  )
}
```

### Форма
```jsx
const { post, data, setData, errors } = useForm()

<form onSubmit={(e) => {
  e.preventDefault()
  post(route('action'))
}}>
  <input
    value={data.field}
    onChange={(e) => setData('field', e.target.value)}
  />
  {errors.field && <p className="text-red-600">{errors.field}</p>}
  <button>Отправить</button>
</form>
```

### Flash сообщения
```jsx
const { flash } = usePage().props

{flash.message && (
  <div className="bg-green-100 text-green-700 p-4">
    {flash.message}
  </div>
)}
```

## 🚀 Развертывание

```bash
# Production сборка
npm run build

# Миграции на production
php artisan migrate --force

# Очистка кеша
php artisan optimize:clear
```

## 📚 Документация в проекте

```
QUICKSTART.md         ← НАЧНИТЕ ОТСЮДА
SHOP_DOCUMENTATION.md - Полная документация
INERTIA_EXAMPLES.md   - Примеры кода
MIGRATIONS_GUIDE.md   - Работа с БД
FILE_STRUCTURE.md     - Структура проекта
README_DOCS.md        - Индекс всей документации
```

## ✨ Полезные команды

```bash
# Создать новый контроллер
php artisan make:controller MyController

# Создать миграцию
php artisan make:migration create_table_name

# Создать модель
php artisan make:model MyModel

# Создать seeder
php artisan make:seeder MySeeder

# Список всех маршрутов
php artisan route:list

# Отбросить и пересоздать БД
php artisan migrate:fresh --seed
```

---

**Сохраните этот файл и спросите его, когда что-то забыли!** 📌
