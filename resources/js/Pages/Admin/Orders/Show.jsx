import React, { useEffect } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import { route } from 'ziggy-js';

export default function ShowOrder({ order }) {
    const { data, setData, put, processing } = useForm({
        status: order.status,
    });

    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        setData('status', newStatus);
    };

    useEffect(() => {
        if (data.status !== order.status) {
            put(route('admin.orders.status', { order: order.id }));
        }
    }, [data.status]);

    return (
        <>
            <Head title={`Заказ #${order.id}`} />
            
            <div className="max-w-4xl mx-auto py-8 px-4">
                <Link href={route('admin.orders')} className="text-blue-600 hover:underline mb-6 inline-block">
                    ← Назад к заказам
                </Link>

                <div className="bg-white rounded-lg shadow p-8">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Заказ #{order.id}</h1>
                            <p className="text-gray-600 mt-2">{order.user?.name} ({order.user?.email})</p>
                        </div>
                        <div>
                            <select
                                value={data.status}
                                onChange={handleStatusChange}
                                disabled={processing}
                                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="pending">Ожидание</option>
                                <option value="processing">В обработке</option>
                                <option value="shipped">Отправлен</option>
                                <option value="delivered">Доставлен</option>
                                <option value="cancelled">Отменен</option>
                            </select>
                        </div>
                    </div>

                    <div className="border-t pt-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Товары в заказе</h2>
                        <div className="space-y-4">
                            {order.items?.map((item) => (
                                <div key={item.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="font-semibold text-gray-900">{item.name}</p>
                                        <p className="text-gray-600 text-sm">Количество: {item.pivot?.quantity}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-gray-900">₽{item.pivot?.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border-t mt-6 pt-6">
                        <div className="flex justify-between items-center text-lg font-semibold">
                            <span>Итого:</span>
                            <span>₽{order.total}</span>
                        </div>
                    </div>

                    <div className="border-t mt-6 pt-6 text-gray-600 text-sm">
                        <p>Дата создания: {new Date(order.created_at).toLocaleString('ru-RU')}</p>
                        <p>Последнее обновление: {new Date(order.updated_at).toLocaleString('ru-RU')}</p>
                    </div>
                </div>
            </div>
        </>
    );
}
