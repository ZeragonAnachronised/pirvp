import React from 'react'
import { Head, Link } from '@inertiajs/react'

export default function CategoriesIndex({ categories }) {
  return (
    <>
      <Head title="Категории" />
      
      <div className="bg-violet">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-8">Категории</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={route('categories.show', category.id)}
              >
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-8 text-white hover:shadow-lg transition cursor-pointer">
                  <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  {category.description && (
                    <p className="text-blue-100 mb-4">{category.description}</p>
                  )}
                  {category.children.length > 0 && (
                    <p className="text-blue-100 text-sm">
                      Подкатегорий: {category.children.length}
                    </p>
                  )}
                  <div className="mt-4 text-blue-100">
                    Перейти →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
