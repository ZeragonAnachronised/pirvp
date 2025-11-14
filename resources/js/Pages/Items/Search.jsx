import React from 'react'
import { Head, Link } from '@inertiajs/react'

export default function ItemsSearch({ items, categories, search, sort }) {
  return (
    <>
      <Head title="Поиск товаров" />
      
      <div className="bg-violet">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-2">Результаты поиска</h1>
          <p className="text-gray-600 mb-8">
            {search && `Поиск: "${search}"`}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {/* Filters */}
            <div className="md:col-span-1">
              <div className="bg-violet-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Сортировка</h3>
                <select
                  defaultValue={sort}
                  onChange={(e) => {
                    window.location.href = `?q=${search}&sort=${e.target.value}`
                  }}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="latest">Новые</option>
                  <option value="price_low">Цена: низкая</option>
                  <option value="price_high">Цена: высокая</option>
                  <option value="popular">Популярные</option>
                </select>
              </div>
            </div>

            {/* Items Grid */}
            <div className="md:col-span-3">
              {items.data?.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {items.data.map((item) => (
                      <Link key={item.id} href={route('items.show', item.id)}>
                        <div className="bg-violet rounded-lg shadow hover:shadow-lg transition cursor-pointer">
                          {item.images.length > 0 && (
                            <img
                              src={item.images[0].path}
                              alt={item.name}
                              className="w-full h-48 object-cover rounded-t-lg"
                            />
                          )}
                          <div className="p-4">
                            <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                              {item.description}
                            </p>
                            <div className="flex justify-between items-center">
                              <span className="text-xl font-bold text-blue-600">
                                ₽ {parseFloat(item.price).toFixed(2)}
                              </span>
                              <span className={`px-3 py-1 rounded text-sm font-medium ${
                                item.stock > 0
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-emerald-100 text-red-800'
                              }`}>
                                {item.stock > 0 ? 'В наличии' : 'Нет'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Pagination */}
                  {items.links && items.links.length > 0 && (
                    <div className="flex justify-center gap-2">
                      {items.links.map((link, index) => (
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
                  <p className="text-gray-600 text-lg mb-4">Товары не найдены</p>
                  <Link href={route('items.index')} className="text-blue-600 hover:underline">
                    Вернуться в каталог
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
