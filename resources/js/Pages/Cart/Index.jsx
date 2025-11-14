import React from 'react'
import { Head, Link, useForm } from '@inertiajs/react'

export default function CartIndex({ cart, items, total }) {
  const { delete: destroy, post } = useForm()

  const handleRemove = (cartItemId) => {
    destroy(route('cart.removeItem', cartItemId))
  }

  const handleClear = () => {
    if (confirm('Вы уверены?')) {
      post(route('cart.clear'))
    }
  }

  const handleCheckout = () => {
    window.location.href = route('orders.checkout')
  }

  return (
    <>
      <Head title="Корзина" />
      
      <div className="bg-violet">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-8">Корзина</h1>

          {items.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-violet-50 rounded-lg p-6">
                  <div className="space-y-4">
                    {items.map((cartItem) => (
                      <div key={cartItem.id} className="bg-violet rounded-lg p-4 flex gap-4">
                        
                        <div className="flex-1">
                          <Link
                            href={route('items.show', cartItem.item.id)}
                            className="font-semibold text-lg hover:text-blue-600"
                          >
                            {cartItem.item.name}
                          </Link>
                          <p className="text-gray-600 text-sm mt-1">
                            Цена: ₽ {parseFloat(cartItem.price).toFixed(2)}
                          </p>
                          <div className="flex items-center gap-2 mt-3">
                            <label className="text-sm">Кол-во:</label>
                            <input
                              type="number"
                              defaultValue={cartItem.quantity}
                              min="1"
                              onChange={(e) => {
                                // Update quantity logic here
                              }}
                              className="w-16 px-2 py-1 border rounded"
                            />
                          </div>
                          <p className="font-semibold mt-2">
                            Сумма: ₽ {(cartItem.quantity * parseFloat(cartItem.price)).toFixed(2)}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemove(cartItem.id)}
                          className="text-red-600 hover:text-red-800 font-semibold"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>

                  {items.length > 0 && (
                    <button
                      onClick={handleClear}
                      className="mt-6 px-4 py-2 text-red-600 hover:text-red-800 font-semibold"
                    >
                      Очистить корзину
                    </button>
                  )}
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-emerald-50 rounded-lg p-6 sticky top-20">
                  <h2 className="text-xl font-bold mb-4">Итого</h2>
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between">
                      <span>Товары ({items.length}):</span>
                      <span>₽ {parseFloat(total).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Доставка:</span>
                      <span>Рассчитается</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-bold text-lg">
                      <span>Итого:</span>
                      <span>₽ {parseFloat(total).toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full bg-emerald-600 text-white py-3 rounded font-semibold hover:bg-emerald-700 transition"
                  >
                    Оформить заказ
                  </button>

                  <Link
                    href={route('items.index')}
                    className="block text-center mt-3 text-blue-600 hover:underline"
                  >
                    Продолжить покупки
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-4">Корзина пуста</p>
              <Link href={route('items.index')} className="text-blue-600 hover:underline">
                Перейти в каталог
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
