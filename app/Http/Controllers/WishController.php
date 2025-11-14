<?php

namespace App\Http\Controllers;

use App\Models\Wish;
use App\Models\Item;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class WishController extends Controller
{
    /**
     * Display wishlist
     */
    public function index(): Response
    {
        $user = auth()->user();

        $wishes = $user->wishes()
            ->with('item.images')
            ->latest()
            ->paginate(12);

        return Inertia::render('Wishes/Index', [
            'wishes' => $wishes,
        ]);
    }

    /**
     * Add item to wishlist
     */
    public function add(Item $item): RedirectResponse
    {
        $user = auth()->user();

        $exists = Wish::where('user_id', $user->id)
            ->where('item_id', $item->id)
            ->exists();

        if ($exists) {
            return redirect()->back()->with('error', 'Товар уже в списке желаний');
        }

        Wish::create([
            'user_id' => $user->id,
            'item_id' => $item->id,
        ]);

        return redirect()->back()->with('message', 'Товар добавлен в список желаний');
    }

    /**
     * Remove item from wishlist
     */
    public function remove(Item $item): RedirectResponse
    {
        $user = auth()->user();

        Wish::where('user_id', $user->id)
            ->where('item_id', $item->id)
            ->delete();

        return redirect()->back()->with('message', 'Товар удален из списка желаний');
    }

    /**
     * Clear wishlist
     */
    public function clear(): RedirectResponse
    {
        $user = auth()->user();
        $user->wishes()->delete();

        return redirect()->route('wishes.index')->with('message', 'Список желаний очищен');
    }
}
