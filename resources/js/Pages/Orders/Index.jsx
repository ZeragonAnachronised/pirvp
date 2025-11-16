import React from 'react'
import { Head, Link } from '@inertiajs/react'

export default function OrdersIndex({ orders }) {
  return (
    <>
      <Head title="Мои заказы" />
      
      <div className="bg-violet">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-8">Мои заказы</h1>

          {orders.data?.length > 0 ? (
            <div className="space-y-4">
              {orders.data.map((order) => (
                <Link key={order.id} href={route('orders.show', order.id)}>
                  <div className="bg-violet-50 rounded-lg p-6 hover:bg-violet-100 transition cursor-pointer">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-gray-600 text-sm">Номер заказа</p>
                        <p className="font-semibold">#{order.id}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Дата</p>
                        <p className="font-semibold">
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Статус</p>
                        <p className="font-semibold">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                              order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                              order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                              order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                          }`}>
                              {order.status}
                          </span>
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-600 text-sm">Сумма</p>
                        <p className="font-semibold text-lg">
                          ₽ {parseFloat(order.total).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}

              {/* Pagination */}
              {orders.links && orders.links.length > 0 && (
                <div className="flex justify-center gap-2 mt-8">
                  {orders.links.map((link, index) => (
                    link.url ? (
                      <a
                        key={index}
                        href={link.url}
                        className={`px-3 py-2 rounded border ${
                          link.active
                            ? 'bg-emerald-500 text-white border-blue-500'
                            : 'border-gray-300 hover:bg-violet-50'
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                      />
                    ) : (
                      <span
                        key={index}
                        className="px-3 py-2 rounded border border-gray-300 text-gray-500"
                        dangerouslySetInnerHTML={{ __html: link.label }}
                      />
                    )
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-4">У вас нет заказов</p>
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
