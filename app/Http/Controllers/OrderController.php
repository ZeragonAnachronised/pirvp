<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Cart;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    /**
     * Display user's orders
     */
    public function index(): Response
    {
        $user = auth()->user();

        $orders = Order::where('user_id', $user->id)
            ->with('items.item')
            ->latest()
            ->paginate(10);

        return Inertia::render('Orders/Index', [
            'orders' => $orders,
        ]);
    }

    /**
     * Display a specific order
     */
    public function show(Order $order): Response
    {

        $order->load('items.item');

        return Inertia::render('Orders/Show', [
            'order' => $order,
            'items' => $order->items,
        ]);
    }

    /**
     * Show checkout form
     */
    public function checkout()
    {
        $user = auth()->user();
        $cart = Cart::where('user_id', $user->id)
            ->where('status', 'active')
            ->with('items.item')
            ->first();

        if (!$cart || $cart->items()->count() === 0) {
            return redirect()->route('cart.index')->with('error', 'Корзина пуста');
        }

        return Inertia::render('Orders/Checkout', [
            'cart' => $cart,
            'items' => $cart->items,
            'total' => $cart->total,
        ]);
    }

    /**
     * Create order from cart
     */
    public function store(): RedirectResponse
    {
        $user = auth()->user();

        $cart = Cart::where('user_id', $user->id)
            ->where('status', 'active')
            ->with('items')
            ->first();

        if (!$cart || $cart->items()->count() === 0) {
            return redirect()->route('cart.index')->with('error', 'Корзина пуста');
        }

        try {
            DB::beginTransaction();

            $order = Order::create([
                'user_id' => $user->id,
                'status' => 'pending',
                'total' => $cart->total,
                'payment_status' => 'pending',
                'shipping_address' => request('shipping_address'),
                'billing_address' => request('billing_address'),
                'currency' => 'RUB',
            ]);

            foreach ($cart->items as $cartItem) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'item_id' => $cartItem->item_id,
                    'quantity' => $cartItem->quantity,
                    'price' => $cartItem->price,
                ]);
            }

            // Mark cart as completed
            $cart->status = 'completed';
            $cart->save();
            $cart->items()->delete();

            DB::commit();

            return redirect()->route('orders.show', $order)->with('message', 'Заказ создан успешно');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Ошибка при создании заказа: ' . $e->getMessage());
        }
    }

    /**
     * Cancel order
     */
    public function cancel(Order $order): RedirectResponse
    {
        $this->authorize('update', $order);

        if ($order->status !== 'pending') {
            return redirect()->back()->with('error', 'Этот заказ не может быть отменен');
        }

        $order->status = 'cancelled';
        $order->save();

        return redirect()->route('orders.show', $order)->with('message', 'Заказ отменен');
    }
}
