import React, { useState, useEffect } from 'react'
import { Link, usePage } from '@inertiajs/react'

export default function Layout({ children }) {
  const { auth, flash } = usePage().props
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const [show, setShow] = useState(!!flash.message);

    useEffect(() => {
        if (flash.message) {
            setShow(true);

            const timer = setTimeout(() => {
                setShow(false);
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, [flash.message]);

  return (
    <div className="min-h-screen flex flex-col bg-violet-50">
      {/* Header */}
      <header className="bg-violet shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold text-violet-400">
              ShopHub
            </Link>

            {/* Search */}
            <div className="hidden md:block flex-1 mx-6">
              <form action={route('items.search')} method="GET" className="flex">
                <input
                  type="text"
                  name="q"
                  placeholder="Поиск товаров..."
                  className="w-full px-4 py-2 border rounded-l-lg focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-emerald-600 text-white px-6 py-2 rounded-r-lg hover:bg-emerald-700 transition"
                >
                  Поиск
                </button>
              </form>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex gap-6 items-center">
              <Link href={route('items.index')} className="text-gray-600 hover:text-blue-600 transition">
                Каталог
              </Link>
              <Link href={route('categories.index')} className="text-gray-600 hover:text-blue-600 transition">
                Категории
              </Link>
              <Link href={route('cart.index')} className="text-gray-600 hover:text-blue-600 transition">
                🛒 Корзина
              </Link>

              {auth.user ? (
                <>
                  <Link href={route('wishes.index')} className="text-gray-600 hover:text-blue-600 transition">
                    ♡ Желания
                  </Link>
                  <Link href={route('orders.index')} className="text-gray-600 hover:text-blue-600 transition">
                    Заказы
                  </Link>
                  <div className="relative group">
                    <button className="text-gray-600 hover:text-blue-600 transition">
                      {auth.user.name}
                    </button>
                    <div className="hidden group-hover:block absolute right-0 w-48 bg-violet rounded-lg shadow-lg z-50">
                      <Link href={route('auth.showProfile')} className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-violet-100">
                        Мой профиль
                      </Link>
                      {auth.user.is_admin && (
                        <Link href={route('admin.dashboard')} className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-violet-100">
                          Админ-панель
                        </Link>
                      )}
                      <form method="get" action={route('auth.logout')} className="block">
                        <button type="submit" className="w-full text-left px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-violet-100">
                          Выход
                        </button>
                      </form>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Link href={route('auth.showLogin')} className="text-gray-600 hover:text-blue-600 transition">
                    Вход
                  </Link>
                  <Link href={route('auth.showRegister')} className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition">
                    Регистрация
                  </Link>
                </>
              )}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-600 hover:text-blue-600"
            >
              ☰
            </button>
          </div>

          {/* Mobile search */}
          <div className="md:hidden mt-4">
            <form action={route('items.search')} method="GET" className="flex">
              <input
                type="text"
                name="q"
                placeholder="Поиск товаров..."
                className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none"
              />
              <button
                type="submit"
                className="bg-emerald-600 text-white px-4 py-2 rounded-r-lg hover:bg-emerald-700 transition"
              >
                🔍
              </button>
            </form>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 space-y-2">
              <Link href={route('items.index')} className="block text-gray-600 hover:text-blue-600 py-2">
                Каталог
              </Link>
              <Link href={route('categories.index')} className="block text-gray-600 hover:text-blue-600 py-2">
                Категории
              </Link>
              <Link href={route('cart.index')} className="block text-gray-600 hover:text-blue-600 py-2">
                🛒 Корзина
              </Link>
              {auth.user && (
                <>
                  <Link href={route('wishes.index')} className="block text-gray-600 hover:text-blue-600 py-2">
                    ♡ Желания
                  </Link>
                  <Link href={route('orders.index')} className="block text-gray-600 hover:text-blue-600 py-2">
                    Заказы
                  </Link>
                </>
              )}
            </nav>
          )}
        </div>
      </header>

      {/* Flash Messages */}
      { show && (flash.message || flash.error) && (
        <div className="fixed top-25 left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-50">
          {flash.message && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
              {flash.message}
            </div>
          )}
          {flash.error && (
            <div className="bg-emerald-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              {flash.error}
            </div>
          )}
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-violet-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-4">О магазине</h3>
              <p className="text-gray-400">Интернет магазин с лучшим выбором товаров</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Категории</h3>
              <Link href={route('categories.index')} className="text-gray-400 hover:text-white block py-1">
                Все категории
              </Link>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Аккаунт</h3>
              {auth.user ? (
                <>
                  <Link href={route('orders.index')} className="text-gray-400 hover:text-white block py-1">
                    Мои заказы
                  </Link>
                  <Link href={route('wishes.index')} className="text-gray-400 hover:text-white block py-1">
                    Список желаний
                  </Link>
                  <Link href={route('auth.showProfile')} className="text-gray-400 hover:text-white block py-1">
                    Профиль
                  </Link>
                </>
              ) : (
                <>
                  <Link href={route('auth.showLogin')} className="text-gray-400 hover:text-white block py-1">
                    Вход
                  </Link>
                  <Link href={route('auth.showRegister')} className="text-gray-400 hover:text-white block py-1">
                    Регистрация
                  </Link>
                </>
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Поддержка</h3>
              <p className="text-gray-400">support@shophub.ru</p>
              <p className="text-gray-400">+7 (999) 123-45-67</p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ShopHub. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
