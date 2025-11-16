import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import { route } from 'ziggy-js';

export default function Dashboard({ stats }) {
    return (
        <>
            <Head title="Админ-панель" />
            
            <div className="max-w-7xl mx-auto py-8 px-4">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900">Админ-панель</h1>
                    <p className="text-gray-600 mt-2">Управление магазином</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                    <div className="bg-blue-500 rounded-lg shadow p-6 text-white">
                        <h3 className="text-sm font-medium opacity-75">Всего пользователей</h3>
                        <p className="text-3xl font-bold mt-2">{stats.total_users}</p>
                    </div>
                    
                    <div className="bg-green-500 rounded-lg shadow p-6 text-white">
                        <h3 className="text-sm font-medium opacity-75">Всего товаров</h3>
                        <p className="text-3xl font-bold mt-2">{stats.total_items}</p>
                    </div>
                    
                    <div className="bg-purple-500 rounded-lg shadow p-6 text-white">
                        <h3 className="text-sm font-medium opacity-75">Всего категорий</h3>
                        <p className="text-3xl font-bold mt-2">{stats.total_categories}</p>
                    </div>
                    
                    <div className="bg-orange-500 rounded-lg shadow p-6 text-white">
                        <h3 className="text-sm font-medium opacity-75">Всего заказов</h3>
                        <p className="text-3xl font-bold mt-2">{stats.total_orders}</p>
                    </div>
                    
                    <div className="bg-red-500 rounded-lg shadow p-6 text-white">
                        <h3 className="text-sm font-medium opacity-75">Общая выручка</h3>
                        <p className="text-3xl font-bold mt-2">₽{stats.total_revenue || '0.00'}</p>
                    </div>
                </div>

                {/* Navigation */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Link
                        href={route('admin.users')}
                        className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition border-l-4 border-blue-500"
                    >
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">👥 Пользователи</h3>
                        <p className="text-gray-600 text-sm">Управление пользователями</p>
                    </Link>

                    <Link
                        href={route('admin.items')}
                        className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition border-l-4 border-green-500"
                    >
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">📦 Товары</h3>
                        <p className="text-gray-600 text-sm">Управление товарами</p>
                    </Link>

                    <Link
                        href={route('admin.orders')}
                        className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition border-l-4 border-orange-500"
                    >
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">🛒 Заказы</h3>
                        <p className="text-gray-600 text-sm">Управление заказами</p>
                    </Link>

                    <Link
                        href={route('admin.categories')}
                        className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition border-l-4 border-purple-500"
                    >
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">🏷️ Категории</h3>
                        <p className="text-gray-600 text-sm">Управление категориями</p>
                    </Link>
                </div>
            </div>
        </>
    );
}
