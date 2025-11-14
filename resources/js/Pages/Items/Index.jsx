import React, { useState, useEffect, useRef } from 'react'
import { Head, Link, router } from '@inertiajs/react'
import Layout from '@/Layouts/Layout'
import { route } from 'ziggy-js'

export default function ItemsIndex({ items, categories, selectedCategory, sortBy: initialSort }) {
  const [sortBy, setSortBy] = useState(initialSort || 'latest')
  const [filterCategory, setFilterCategory] = useState(selectedCategory || null)
  const isInitial = useRef(true)

  // Handle sort or category filter change (but not on initial render)
  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false
      return
    }

    const params = {}
    if (sortBy) params.sort = sortBy
    if (filterCategory) params.category = filterCategory
    
    router.get(route('items.index'), params, { preserveState: false })
  }, [sortBy, filterCategory])

  const buildPaginationUrl = (url) => {
    if (!url) return url
    
    const urlObj = new URL(url, window.location.origin)
    if (sortBy) urlObj.searchParams.set('sort', sortBy)
    if (filterCategory) urlObj.searchParams.set('category', filterCategory)
    
    return urlObj.toString()
  }

  return (
    <>
      <Head title="Товары" />
      
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-8">Каталог товаров</h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {/* Filters */}
            <div className="md:col-span-1">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Категории</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setFilterCategory(null)}
                    className={`block w-full text-left px-3 py-2 rounded transition ${
                      filterCategory === null
                        ? 'bg-emerald-600 text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    Все товары
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setFilterCategory(category.id)}
                      className={`block w-full text-left px-3 py-2 rounded transition ${
                        filterCategory === category.id
                          ? 'bg-emerald-600 text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>

                <h3 className="text-lg font-semibold mt-6 mb-4">Сортировка</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.data?.map((item) => (
                  <Link key={item.id} href={route('items.show', item.id)}>
                    <div className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer h-full">
                      {item.images.length > 0 && (
                        <img
                          src={item.images[0].path}
                          alt={item.name}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                      )}
                      <div className="p-4 flex flex-col h-full">
                        <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                          {item.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-xl font-bold text-blue-600">
                            ₽{parseFloat(item.price).toLocaleString('ru-RU')}
                          </span>
                          <span className={`px-3 py-1 rounded text-sm font-medium ${
                            item.stock > 0
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {item.stock > 0 ? 'В наличии' : 'Нет'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Empty state */}
              {(!items.data || items.data.length === 0) && (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">Товары не найдены</p>
                </div>
              )}

              {/* Pagination */}
              {items.links && items.links.length > 0 && (
                <div className="mt-8 flex justify-center gap-2">
                  {items.links.map((link, index) => (
                    link.url ? (
                      <Link
                        key={index}
                        href={buildPaginationUrl(link.url)}
                        className={`px-3 py-2 rounded border transition ${
                          link.active
                            ? 'bg-emerald-600 text-white border-blue-600'
                            : 'border-gray-300 hover:bg-gray-100'
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
          </div>
        </div>
      </div>
    </>
  )
}
