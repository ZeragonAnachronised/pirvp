import React from 'react'
import { Head, Link } from '@inertiajs/react'

export default function WishesIndex({ wishes }) {
  return (
    <>
      <Head title="Список желаний" />
      
      <div className="bg-violet">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-8">Список желаний</h1>

          {wishes.data?.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {wishes.data.map((wish) => (
                  <Link key={wish.id} href={route('items.show', wish.item.id)}>
                    <div className="bg-violet rounded-lg shadow hover:shadow-lg transition cursor-pointer">
                      {wish.item.images.length > 0 && (
                        <img
                          src={wish.item.images[0].path}
                          alt={wish.item.name}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                      )}
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                          {wish.item.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {wish.item.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-xl font-bold text-blue-600">
                            ₽ {parseFloat(wish.item.price).toFixed(2)}
                          </span>
                          <span className={`px-3 py-1 rounded text-sm font-medium ${
                            wish.item.stock > 0
                              ? 'bg-green-100 text-green-800'
                              : 'bg-emerald-100 text-red-800'
                          }`}>
                            {wish.item.stock > 0 ? 'В наличии' : 'Нет'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {wishes.links && wishes.links.length > 0 && (
                <div className="flex justify-center gap-2">
                  {wishes.links.map((link, index) => (
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
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-4">Список желаний пуст</p>
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
