import React, { useState } from 'react'
import { Head, Link, useForm } from '@inertiajs/react'
import { router } from '@inertiajs/react';

export default function ItemsShow({ item, relatedItems, averageRating, reviewCount }) {
  const [quantity, setQuantity] = useState(1)
  const { post } = useForm()

  const handleAddToCart = () => {
    post(route('cart.add', [item.id, quantity]))
  }

  const handleAddToWishlist = () => {
    post(route('wishes.add', item.id))
  }

  return (
    <>
      <Head title={item.name} />
      
      <div className="bg-violet">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Product Images */}
            <div>
              {item.images.length > 0 && (
                <div className="bg-violet-100 rounded-lg overflow-hidden">
                  <img
                    src={item.images[0].path}
                    alt={item.name}
                    className="w-full h-96 object-cover"
                  />
                </div>
              )}
              {item.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {item.images.map((image) => (
                    <img
                      key={image.id}
                      src={image.path}
                      alt=""
                      className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-75"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-4">
                {item.category && (
                  <Link href={route('categories.show', item.category.id)} className="text-blue-600 hover:underline">
                    {item.category.name}
                  </Link>
                )}
              </div>

              <h1 className="text-3xl font-bold mb-2">{item.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>
                      {i < Math.round(averageRating) ? '★' : '☆'}
                    </span>
                  ))}
                </div>
                <span className="text-gray-600">
                  {averageRating.toFixed(1)} ({reviewCount} отзывов)
                </span>
              </div>

              {/* Price */}
              <div className="text-4xl font-bold text-blue-600 mb-6">
                ₽ {parseFloat(item.price).toFixed(2)}
              </div>

              {/* Stock */}
              <div className="mb-6">
                <span className={`px-4 py-2 rounded font-medium ${
                  item.stock > 0
                    ? 'bg-green-100 text-green-800'
                    : 'bg-emerald-100 text-red-800'
                }`}>
                  {item.stock > 0 ? `В наличии: ${item.stock}` : 'Нет в наличии'}
                </span>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-2">Описание</h3>
                <p className="text-gray-700">{item.description}</p>
              </div>

              {/* SKU */}
              <div className="mb-8 text-gray-600">
                <p>Артикул: {item.sku}</p>
              </div>

              {/* Actions */}
              {item.stock > 0 && (
                <div className="flex gap-4 mb-6">
                  <div className="flex items-center border rounded">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 text-gray-600"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      min="1"
                      max={item.stock}
                      className="w-16 text-center border-0 outline-none"
                    />
                    <button
                      onClick={() => setQuantity(Math.min(item.stock, quantity + 1))}
                      className="px-4 py-2 text-gray-600"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-emerald-600 text-white px-6 py-3 rounded font-semibold hover:bg-emerald-700 transition"
                  >
                    В корзину
                  </button>

                  <button
                    onClick={handleAddToWishlist}
                    className="px-6 py-3 border border-gray-300 rounded font-semibold hover:bg-violet-50 transition"
                  >
                    ♡
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Related Items */}
          {relatedItems.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Похожие товары</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedItems.map((relItem) => (
                  <Link key={relItem.id} href={route('items.show', relItem.id)}>
                    <div className="bg-violet rounded-lg shadow hover:shadow-lg transition">
                      <div className="p-4">
                        <h3 className="font-semibold mb-2 line-clamp-2">{relItem.name}</h3>
                        <p className="text-xl font-bold text-blue-600">
                          ₽ {parseFloat(relItem.price).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Reviews */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Отзывы</h2>
            <Link
              href={route('reviews.index', item.id)}
              className="text-blue-600 hover:underline mb-4 inline-block"
            >
              Смотреть все отзывы ({reviewCount})
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
