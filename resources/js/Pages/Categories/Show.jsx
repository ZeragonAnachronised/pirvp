import React from 'react'
import { Head, Link } from '@inertiajs/react'

export default function CategoriesShow({ category, items, childCategories }) {
  return (
    <>
      <Head title={category.name} />
      
      <div className="bg-violet">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href={route('categories.index')} className="text-blue-600 hover:underline mb-4 inline-block">
            ← Все категории
          </Link>

          <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
          {category.description && (
            <p className="text-gray-600 mb-8">{category.description}</p>
          )}

          {/* Subcategories */}
          {childCategories.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Подкатегории</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {childCategories.map((subCategory) => (
                  <Link
                    key={subCategory.id}
                    href={route('categories.show', subCategory.id)}
                  >
                    <div className="bg-emerald-50 rounded-lg p-4 hover:bg-emerald-100 transition cursor-pointer">
                      <h3 className="font-semibold">{subCategory.name}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Items */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Товары</h2>
            {items.data?.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                          <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                            {item.name}
                          </h3>
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
              <p className="text-gray-600 text-center py-8">Товары не найдены</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
