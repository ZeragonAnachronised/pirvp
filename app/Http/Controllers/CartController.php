<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Item;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class CartController extends Controller
{
    /**
     * Display the shopping cart
     */
    public function index(): Response
    {
        $cart = $this->getOrCreateCart();
        $cart->load(['items.item']);

        return Inertia::render('Cart/Index', [
            'cart' => $cart,
            'items' => $cart->items,
            'total' => $cart->total,
        ]);
    }

    /**
     * Add item to cart
     */
    public function add($id, $quantity): RedirectResponse
    {
        $item = Item::findOrFail($id);
        $cart = $this->getOrCreateCart();

        $cartItem = $cart->items()->firstOrNew(['item_id' => $item->id]);

        if ($cartItem->exists) {
            $cartItem->quantity += $quantity;
        } else {
            $cartItem->quantity = $quantity;
        }

        $cartItem->price = $item->price;
        $cartItem->save();

        $this->updateCartTotal($cart);

        return redirect()->route('cart.index')->with('message', 'Товар добавлен в корзину');
    }

    /**
     * Update cart item quantity
     */
    public function updateItem(CartItem $cartItem): RedirectResponse
    {
        $quantity = request('quantity', 1);

        if ($quantity <= 0) {
            $cartItem->delete();
        } else {
            $cartItem->quantity = $quantity;
            $cartItem->save();
        }

        $cart = $cartItem->cart;
        $this->updateCartTotal($cart);

        return redirect()->route('cart.index')->with('message', 'Корзина обновлена');
    }

    /**
     * Remove item from cart
     */
    public function removeItem(CartItem $cartItem): RedirectResponse
    {
        $cart = $cartItem->cart;
        $cartItem->delete();
        $this->updateCartTotal($cart);

        return redirect()->route('cart.index')->with('message', 'Товар удален из корзины');
    }

    /**
     * Clear cart
     */
    public function clear(): RedirectResponse
    {
        $cart = $this->getOrCreateCart();
        $cart->items()->delete();
        $cart->total = 0;
        $cart->save();

        return redirect()->route('cart.index')->with('message', 'Корзина очищена');
    }

    /**
     * Get or create cart
     */
    private function getOrCreateCart(): Cart
    {
        $user = auth()->user();

        if ($user) {
            return Cart::firstOrCreate(
                ['user_id' => $user->id, 'status' => 'active'],
                ['session_id' => session()->getId()]
            );
        }

        $sessionId = session()->getId();
        return Cart::firstOrCreate(
            ['session_id' => $sessionId, 'status' => 'active'],
            ['user_id' => null]
        );
    }

    /**
     * Update cart total
     */
    private function updateCartTotal(Cart $cart): void
    {
        $total = $cart->items()->sum(\DB::raw('quantity * price'));
        $cart->total = $total;
        $cart->save();
    }
}
