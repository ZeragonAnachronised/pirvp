import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import { route } from 'ziggy-js';

export default function ItemsIndex({ items }) {
    const { flash } = usePage().props;

    return (
        <>
            <Head title="Товары" />
            
            <div className="max-w-7xl mx-auto py-8 px-4">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Товары</h1>
                        <p className="text-gray-600 mt-2">Всего: {items.total}</p>
                    </div>
                    <div className="space-x-4">
                        <Link 
                            href={route('admin.items.create')} 
                            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                        >
                            + Новый товар
                        </Link>
                        <Link href={route('admin.dashboard')} className="text-blue-600 hover:underline">
                            ← Назад
                        </Link>
                    </div>
                </div>

                {flash.success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                        {flash.success}
                    </div>
                )}

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Название</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Категория</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Цена</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Запас</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.data.map((item) => (
                                <tr key={item.id} className="border-b hover:bg-gray-50">
                                    <td className="px-6 py-4">{item.name}</td>
                                    <td className="px-6 py-4">{item.category?.name}</td>
                                    <td className="px-6 py-4">₽{item.price}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            item.stock > 0
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {item.stock}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 space-x-2">
                                        <Link
                                            href={route('admin.items.edit', { item: item.id })}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Редактировать
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-6 flex justify-center gap-2">
                    {items.links.map((link, key) => (
                        link.url ? (
                            <Link
                                key={key}
                                href={link.url}
                                className={`px-3 py-2 rounded ${
                                    link.active
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ) : (
                            <span
                                key={key}
                                className="px-3 py-2 rounded bg-gray-200 text-gray-500 opacity-50 cursor-not-allowed"
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        )
                    ))}
                </div>
            </div>
        </>
    );
}
