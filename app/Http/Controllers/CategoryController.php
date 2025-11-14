<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    /**
     * Display all categories
     */
    public function index(): Response
    {
        $categories = Category::where('parent_id', null)
            ->with('children')
            ->get();

        return Inertia::render('Categories/Index', [
            'categories' => $categories,
        ]);
    }

    /**
     * Display category with items
     */
    public function show($id): Response
    {
        $category = Category::with('children')->findOrFail($id);
        $items = $category->items()
            ->with('images')
            ->where('is_active', true)
            ->paginate(12);

        $childCategories = $category->children()->get();

        return Inertia::render('Categories/Show', [
            'category' => $category,
            'items' => $items,
            'childCategories' => $childCategories,
        ]);
    }
}
