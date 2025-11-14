<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Category;
use Inertia\Inertia;
use Inertia\Response;

class ItemController extends Controller
{
    /**
     * Display a listing of items
     */
    public function index(): Response
    {
        $sort = request('sort', 'latest');
        $category = request('category');

        $query = Item::with(['category', 'images'])
            ->where('is_active', true);

        // Apply category filter
        if ($category) {
            $query->where('category_id', $category);
        }

        // Apply sorting
        switch ($sort) {
            case 'price_low':
                $query->orderBy('price', 'asc');
                break;
            case 'price_high':
                $query->orderBy('price', 'desc');
                break;
            case 'popular':
                $query->orderBy('stock', 'desc');
                break;
            case 'latest':
            default:
                $query->latest();
                break;
        }

        $items = $query->paginate(12);
        $categories = Category::where('parent_id', null)->get();

        return Inertia::render('Items/Index', [
            'items' => $items,
            'categories' => $categories,
            'selectedCategory' => $category ? (int)$category : null,
            'sortBy' => $sort,
        ]);
    }

    /**
     * Display items by category
     */
    public function byCategory(Category $category): Response
    {
        $items = $category->items()
            ->with(['images'])
            ->where('is_active', true)
            ->latest()
            ->paginate(12);

        $categories = Category::where('parent_id', null)->get();

        return Inertia::render('Items/Index', [
            'items' => $items,
            'categories' => $categories,
            'selectedCategory' => $category->id,
        ]);
    }

    /**
     * Display the specified item
     */
    public function show($id): Response
    {
        $item = Item::with(['category', 'images', 'reviews.user'])->findOrFail($id);

        $relatedItems = Item::where('category_id', $item->category_id)
            ->where('id', '!=', $item->id)
            ->where('is_active', true)
            ->limit(4)
            ->get();

        $averageRating = $item->reviews()->avg('rating') ?? 0;
        $reviewCount = $item->reviews()->count();

        return Inertia::render('Items/Show', [
            'item' => $item,
            'relatedItems' => $relatedItems,
            'averageRating' => $averageRating,
            'reviewCount' => $reviewCount,
        ]);
    }

    /**
     * Search items
     */
    public function search(): Response
    {
        $search = request('q', '');
        $sort = request('sort', 'latest');

        $query = Item::where('is_active', true);

        if ($search) {
            $query->where('name', 'like', "%$search%")
                ->orWhere('description', 'like', "%$search%");
        }

        $query->with(['category', 'images']);

        $items = match ($sort) {
            'price_low' => $query->orderBy('price', 'asc')->paginate(12),
            'price_high' => $query->orderBy('price', 'desc')->paginate(12),
            'popular' => $query->withCount('orderItems')->orderBy('order_items_count', 'desc')->paginate(12),
            default => $query->latest()->paginate(12),
        };

        $categories = Category::where('parent_id', null)->get();

        return Inertia::render('Items/Search', [
            'items' => $items,
            'categories' => $categories,
            'search' => $search,
            'sort' => $sort,
        ]);
    }
}
