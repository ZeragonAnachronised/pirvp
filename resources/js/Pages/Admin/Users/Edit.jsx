import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import { route } from 'ziggy-js';

export default function EditUser({ user }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        is_admin: user.is_admin,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.users.update', { user: user.id }));
    };

    return (
        <>
            <Head title={`Редактировать ${user.name}`} />
            
            <div className="max-w-2xl mx-auto py-8 px-4">
                <Link href={route('admin.users')} className="text-blue-600 hover:underline mb-6 inline-block">
                    ← Назад к пользователям
                </Link>

                <div className="bg-white rounded-lg shadow p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Редактировать пользователя</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Имя
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.name ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.email ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                            )}
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={data.is_admin}
                                onChange={(e) => setData('is_admin', e.target.checked)}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label className="ml-2 text-sm font-medium text-gray-700">
                                Администратор
                            </label>
                        </div>

                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                            >
                                {processing ? 'Сохранение...' : 'Сохранить'}
                            </button>
                            <Link
                                href={route('admin.users.delete', { user: user.id })}
                                method="delete"
                                as="button"
                                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
                            >
                                Удалить
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
