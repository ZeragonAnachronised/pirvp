import React from 'react'
import { Head, Link, useForm } from '@inertiajs/react'

export default function OrdersShow({ order, items }) {
  const { post } = useForm()

  const handleCancel = () => {
    if (confirm('Вы уверены в отмене заказа?')) {
      post(route('orders.cancel', order.id))
    }
  }

  return (
    <>
      <Head title={`Заказ #${order.id}`} />
      
      <div className="bg-violet">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <Link href={route('orders.index')} className="text-blue-600 hover:underline">
              ← Вернуться к заказам
            </Link>
          </div>

          <h1 className="text-3xl font-bold mb-2">Заказ #{order.id}</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-violet-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">Статус</p>
              <p className="font-semibold text-lg mt-1">
                <span className={`px-3 py-1 rounded text-sm ${
                  order.status === 'completed' ? 'bg-green-100 text-green-800' :
                  order.status === 'cancelled' ? 'bg-emerald-100 text-red-800' :
                  'bg-emerald-100 text-blue-800'
                }`}>
                  {order.status === 'pending' && 'В ожидании'}
                  {order.status === 'completed' && 'Завершен'}
                  {order.status === 'cancelled' && 'Отменен'}
                </span>
              </p>
            </div>

            <div className="bg-violet-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">Дата заказа</p>
              <p className="font-semibold text-lg mt-1">
                {new Date(order.created_at).toLocaleDateString()}
              </p>
            </div>

            <div className="bg-violet-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">Сумма</p>
              <p className="font-semibold text-lg mt-1 text-blue-600">
                ₽ {parseFloat(order.total).toFixed(2)}
              </p>
            </div>
          </div>

          {/* Items */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Товары</h2>
            <div className="space-y-3">
              {items.map((orderItem) => (
                <div key={orderItem.id} className="bg-violet-50 rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <Link
                      href={route('items.show', orderItem.item.id)}
                      className="font-semibold hover:text-blue-600"
                    >
                      {orderItem.item.name}
                    </Link>
                    <p className="text-gray-600 text-sm mt-1">
                      {orderItem.quantity} x ₽ {parseFloat(orderItem.price).toFixed(2)}
                    </p>
                  </div>
                  <p className="font-semibold">
                    ₽ {(orderItem.quantity * parseFloat(orderItem.price)).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-violet-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Адрес доставки</h3>
              <p className="text-gray-700 whitespace-pre-wrap">
                {order.shipping_address}
              </p>
            </div>

            <div className="bg-violet-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Адрес для счета</h3>
              <p className="text-gray-700 whitespace-pre-wrap">
                {order.billing_address || order.shipping_address}
              </p>
            </div>
          </div>

          {/* Actions */}
          {order.status === 'pending' && (
            <div className="flex gap-4">
              <button
                onClick={handleCancel}
                className="px-6 py-2 bg-emerald-600 text-white rounded font-semibold hover:bg-emerald-700 transition"
              >
                Отменить заказ
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
