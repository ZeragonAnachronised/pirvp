import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import { route } from 'ziggy-js';

export default function UsersIndex({ users }) {
    const { flash } = usePage().props;

    return (
        <>
            <Head title="Пользователи" />
            
            <div className="max-w-7xl mx-auto py-8 px-4">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Пользователи</h1>
                        <p className="text-gray-600 mt-2">Всего: {users.total}</p>
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
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Имя</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Админ</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.data.map((user) => (
                                <tr key={user.id} className="border-b hover:bg-gray-50">
                                    <td className="px-6 py-4">{user.name}</td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            user.is_admin 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-gray-100 text-gray-800'
                                        }`}>
                                            {user.is_admin ? 'Да' : 'Нет'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 space-x-2">
                                        <Link
                                            href={route('admin.users.edit', { user: user.id })}
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
                    {users.links.map((link, key) => (
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
