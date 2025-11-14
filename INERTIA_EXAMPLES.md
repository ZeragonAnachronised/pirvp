# Примеры кода Inertia компонентов

## 1. Использование Link для навигации

```jsx
import { Link } from '@inertiajs/react'

// Навигация к товару
<Link href={route('items.show', item.id)}>
  Посмотреть товар
</Link>

// Навигация с параметрами
<Link href={`/items/search?q=query&sort=price_low`}>
  Поиск
</Link>
```

## 2. Работа с формами

```jsx
import { useForm } from '@inertiajs/react'

export default function AddToCart({ item }) {
  const { post, processing, errors } = useForm()

  const handleAddToCart = () => {
    post(route('cart.add', item.id), {
      data: { quantity: 1 },
      onSuccess: () => {
        // Товар добавлен
      },
      onError: (errors) => {
        console.log(errors)
      }
    })
  }

  return (
    <button onClick={handleAddToCart} disabled={processing}>
      {processing ? 'Добавляю...' : 'В корзину'}
    </button>
  )
}
```

## 3. Отправка DELETE запроса

```jsx
import { useForm } from '@inertiajs/react'

export default function DeleteButton({ itemId }) {
  const { delete: destroy, processing } = useForm()

  const handleDelete = () => {
    if (confirm('Вы уверены?')) {
      destroy(route('cart.removeItem', itemId))
    }
  }

  return (
    <button onClick={handleDelete} disabled={processing}>
      Удалить
    </button>
  )
}
```

## 4. Работа с pagination

```jsx
export default function ItemsList({ items }) {
  return (
    <>
      <div className="grid gap-6">
        {items.data.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>

      {/* Пагинация */}
      <div className="flex gap-2 mt-8">
        {items.links.map((link, index) => (
          link.url ? (
            <a
              key={index}
              href={link.url}
              className={link.active ? 'font-bold' : ''}
              dangerouslySetInnerHTML={{ __html: link.label }}
            />
          ) : (
            <span key={index} className="text-gray-500">
              {link.label}
            </span>
          )
        ))}
      </div>
    </>
  )
}
```

## 5. Условный рендер для авторизованных пользователей

```jsx
import { usePage } from '@inertiajs/react'

export default function UserMenu() {
  const { auth } = usePage().props

  if (auth.user) {
    return (
      <div>
        <p>Привет, {auth.user.name}!</p>
        <a href={route('logout')} method="post">
          Выход
        </a>
      </div>
    )
  }

  return (
    <div>
      <a href={route('login')}>Вход</a>
      <a href={route('register')}>Регистрация</a>
    </div>
  )
}
```

## 6. Flash сообщения

```jsx
import { usePage } from '@inertiajs/react'

export default function Layout({ children }) {
  const { flash } = usePage().props

  return (
    <div>
      {flash.message && (
        <div className="bg-green-100 border border-green-400 text-green-700 p-4 mb-4">
          {flash.message}
        </div>
      )}

      {flash.error && (
        <div className="bg-emerald-100 border border-red-400 text-red-700 p-4 mb-4">
          {flash.error}
        </div>
      )}

      {children}
    </div>
  )
}
```

## 7. Динамические URL параметры

```jsx
// В контроллере
return Inertia::render('Orders/Show', [
  'order' => $order,
])

// В компоненте
import { Head } from '@inertiajs/react'

export default function Show({ order }) {
  return (
    <>
      <Head title={`Заказ #${order.id}`} />
      <h1>Заказ #{order.id}</h1>
      <p>Сумма: ₽ {order.total}</p>
    </>
  )
}
```

## 8. Реактивные фильтры

```jsx
import { useState } from 'react'

export default function ItemsList({ items, categories }) {
  const [filter, setFilter] = useState(null)
  const [sort, setSort] = useState('latest')

  const filteredItems = filter
    ? items.filter(item => item.category_id === filter)
    : items

  return (
    <div className="grid grid-cols-4 gap-6">
      {/* Фильтры */}
      <div>
        <select value={filter || ''} onChange={(e) => setFilter(e.target.value ? Number(e.target.value) : null)}>
          <option value="">Все категории</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="latest">Новые</option>
          <option value="price_low">Цена ↓</option>
          <option value="price_high">Цена ↑</option>
        </select>
      </div>

      {/* Товары */}
      <div className="col-span-3">
        {filteredItems.map(item => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
    </div>
  )
}
```

## 9. Loading состояние

```jsx
import { useForm } from '@inertiajs/react'

export default function CheckoutForm() {
  const { post, processing, data, setData } = useForm({
    shipping_address: '',
  })

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      post(route('orders.store'))
    }}>
      <textarea
        value={data.shipping_address}
        onChange={(e) => setData('shipping_address', e.target.value)}
        disabled={processing}
      />
      
      <button type="submit" disabled={processing}>
        {processing ? '⏳ Обработка...' : '✓ Создать заказ'}
      </button>
    </form>
  )
}
```

## 10. Обработка ошибок валидации

```jsx
import { useForm } from '@inertiajs/react'

export default function ReviewForm({ itemId }) {
  const { post, data, setData, errors, processing } = useForm({
    rating: 5,
    comment: '',
  })

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      post(route('reviews.store', itemId))
    }}>
      <div>
        <label>Оценка</label>
        <select
          value={data.rating}
          onChange={(e) => setData('rating', e.target.value)}
        >
          {[1, 2, 3, 4, 5].map(n => (
            <option key={n} value={n}>{n} ★</option>
          ))}
        </select>
        {errors.rating && <p className="text-red-600">{errors.rating}</p>}
      </div>

      <div>
        <label>Комментарий</label>
        <textarea
          value={data.comment}
          onChange={(e) => setData('comment', e.target.value)}
        />
        {errors.comment && <p className="text-red-600">{errors.comment}</p>}
      </div>

      <button type="submit" disabled={processing}>
        Отправить
      </button>
    </form>
  )
}
```

## 11. HEAD для SEO

```jsx
import { Head } from '@inertiajs/react'

export default function ItemShow({ item }) {
  return (
    <>
      <Head
        title={item.name}
        description={item.description}
        keywords={`${item.category.name}, ${item.name}`}
      />
      <h1>{item.name}</h1>
    </>
  )
}
```

## 12. Кастомная навигация

```jsx
import { usePage, Link } from '@inertiajs/react'

export default function Breadcrumb() {
  const { component } = usePage()

  const breadcrumbs = {
    'Items/Show': 'Товары',
    'Orders/Show': 'Заказы',
    'Reviews/Index': 'Отзывы',
  }

  return (
    <nav className="flex gap-2">
      <Link href={route('home')}>Главная</Link>
      <span>/</span>
      <span>{breadcrumbs[component]}</span>
    </nav>
  )
}
```

---

Эти примеры показывают основные паттерны работы с Inertia в этом приложении.
