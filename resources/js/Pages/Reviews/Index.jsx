import React from 'react'
import { Head, Link } from '@inertiajs/react'

export default function ReviewsIndex({ item, reviews, averageRating, ratingDistribution }) {
  return (
    <>
      <Head title={`Отзывы на ${item.name}`} />
      
      <div className="bg-violet">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href={route('items.show', item.id)} className="text-blue-600 hover:underline mb-4 inline-block">
            ← {item.name}
          </Link>

          <h1 className="text-3xl font-bold mb-8">Отзывы</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Rating Summary */}
            <div className="bg-violet-50 p-6 rounded-lg">
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-yellow-400 mb-2">
                  {averageRating}
                </div>
                <div className="flex justify-center text-yellow-400 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>
                      {i < Math.round(averageRating) ? '★' : '☆'}
                    </span>
                  ))}
                </div>
                <p className="text-gray-600">
                  на основе {reviews.total} отзывов
                </p>
              </div>

              {/* Rating Distribution */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 w-8">{rating}★</span>
                    <div className="flex-1 bg-violet-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{
                          width: `${(ratingDistribution[rating] || 0) / reviews.total * 100}%`
                        }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">
                      {ratingDistribution[rating] || 0}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews List */}
            <div className="md:col-span-2">
              <div className="space-y-4">
                {reviews.data?.map((review) => (
                  <div key={review.id} className="bg-violet-50 p-6 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold">{review.user.name}</p>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <span key={i}>
                              {i < review.rating ? '★' : '☆'}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">
                        {new Date(review.created_at).toLocaleDateString()}
                      </p>
                    </div>

                    {review.comment && (
                      <p className="text-gray-700 mt-3">
                        {review.comment}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {reviews.links && reviews.links.length > 0 && (
                <div className="flex justify-center gap-2 mt-8">
                  {reviews.links.map((link, index) => (
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
          </div>
        </div>
      </div>
    </>
  )
}
