<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Item;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class ReviewController extends Controller
{
    /**
     * Display reviews for an item
     */
    public function index(Item $item): Response
    {
        $reviews = $item->reviews()
            ->with('user')
            ->latest()
            ->paginate(10);

        $averageRating = $item->reviews()->avg('rating') ?? 0;
        $ratingDistribution = DB::table('reviews')
            ->where('item_id', $item->id)
            ->selectRaw('rating, count(*) as count')
            ->groupBy('rating')
            ->pluck('count', 'rating');

        return Inertia::render('Reviews/Index', [
            'item' => $item,
            'reviews' => $reviews,
            'averageRating' => round($averageRating, 1),
            'ratingDistribution' => $ratingDistribution,
        ]);
    }

    /**
     * Store a new review
     */
    public function store(Item $item): RedirectResponse
    {
        $user = auth()->user();

        // Check if user already reviewed this item
        $existingReview = Review::where('user_id', $user->id)
            ->where('item_id', $item->id)
            ->first();

        if ($existingReview) {
            return redirect()->back()->with('error', 'Вы уже оставили отзыв на этот товар');
        }

        $validated = request()->validate([
            'rating' => 'required|integer|between:1,5',
            'comment' => 'nullable|string|max:1000',
        ]);

        Review::create([
            'user_id' => $user->id,
            'item_id' => $item->id,
            'rating' => $validated['rating'],
            'comment' => $validated['comment'],
        ]);

        return redirect()->back()->with('message', 'Спасибо за ваш отзыв!');
    }

    /**
     * Delete review
     */
    public function destroy(Review $review): RedirectResponse
    {
        $this->authorize('delete', $review);

        $itemId = $review->item_id;
        $review->delete();

        return redirect()->route('reviews.index', $itemId)->with('message', 'Отзыв удален');
    }

    /**
     * Update review
     */
    public function update(Review $review): RedirectResponse
    {
        $this->authorize('update', $review);

        $validated = request()->validate([
            'rating' => 'required|integer|between:1,5',
            'comment' => 'nullable|string|max:1000',
        ]);

        $review->update($validated);

        return redirect()->back()->with('message', 'Отзыв обновлен');
    }
}
