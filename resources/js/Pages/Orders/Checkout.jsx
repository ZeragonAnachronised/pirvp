import React, { useState } from 'react'
import { Head, useForm } from '@inertiajs/react'

export default function OrdersCheckout({ cart, items, total }) {
  const { data, setData, post, errors, processing } = useForm({
    shipping_address: '',
    billing_address: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    post(route('orders.store'))
  }

  return (
    <>
      <Head title="Оформление заказа" />
      
      <div className="bg-violet">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-8">Оформление заказа</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Shipping Address */}
                <div className="bg-violet-50 rounded-lg p-6">
                  <h2 className="text-lg font-semibold mb-4">Адрес доставки</h2>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Полный адрес
                    </label>
                    <textarea
                      value={data.shipping_address}
                      onChange={(e) => setData('shipping_address', e.target.value)}
                      rows="3"
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Улица, дом, квартира..."
                    />
                    {errors.shipping_address && (
                      <p className="text-red-600 text-sm mt-1">{errors.shipping_address}</p>
                    )}
                  </div>
                </div>

                {/* Billing Address */}
                <div className="bg-violet-50 rounded-lg p-6">
                  <h2 className="text-lg font-semibold mb-4">Адрес для счета</h2>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Полный адрес (если отличается)
                    </label>
                    <textarea
                      value={data.billing_address}
                      onChange={(e) => setData('billing_address', e.target.value)}
                      rows="3"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Улица, дом, квартира..."
                    />
                    {errors.billing_address && (
                      <p className="text-red-600 text-sm mt-1">{errors.billing_address}</p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={processing}
                  className="w-full bg-emerald-600 text-white py-3 rounded font-semibold hover:bg-emerald-700 transition disabled:bg-violet-400"
                >
                  {processing ? 'Обработка...' : 'Создать заказ'}
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-emerald-50 rounded-lg p-6 sticky top-20">
                <h2 className="text-lg font-bold mb-4">Ваш заказ</h2>
                
                <div className="space-y-3 mb-6">
                  {items.map((cartItem) => (
                    <div key={cartItem.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {cartItem.item.name} x {cartItem.quantity}
                      </span>
                      <span className="font-medium">
                        ₽ {(cartItem.quantity * parseFloat(cartItem.price)).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-blue-200 pt-4">
                  <div className="flex justify-between mb-2">
                    <span>Сумма товаров:</span>
                    <span>₽ {parseFloat(total).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span>Доставка:</span>
                    <span>Бесплатно</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Итого:</span>
                    <span>₽ {parseFloat(total).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
