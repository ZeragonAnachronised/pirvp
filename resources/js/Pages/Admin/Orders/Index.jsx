import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import { route } from 'ziggy-js';

export default function OrdersIndex({ orders }) {
    const { flash } = usePage().props;

    return (
        <>
            <Head title="Заказы" />
            
            <div className="max-w-7xl mx-auto py-8 px-4">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Заказы</h1>
                        <p className="text-gray-600 mt-2">Всего: {orders.total}</p>
                    </div>
                    <Link href={route('admin.dashboard')} className="text-blue-600 hover:underline">
                        ← Назад к панели
                    </Link>
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
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">ID</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Пользователь</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Статус</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Сумма</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Дата</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.data.map((order) => (
                                <tr key={order.id} className="border-b hover:bg-gray-50">
                                    <td className="px-6 py-4">#{order.id}</td>
                                    <td className="px-6 py-4">{order.user?.name}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                            order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                            order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                                            order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                            'bg-gray-100 text-gray-800'
                                        }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">₽{order.total}</td>
                                    <td className="px-6 py-4">{new Date(order.created_at).toLocaleDateString('ru-RU')}</td>
                                    <td className="px-6 py-4">
                                        <Link
                                            href={route('admin.orders.show', { order: order.id })}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Просмотр
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-6 flex justify-center gap-2">
                    {orders.links.map((link, key) => (
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
