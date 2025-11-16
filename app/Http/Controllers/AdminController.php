<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Item;
use App\Models\Category;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Admin dashboard
     */
    public function dashboard()
    {
        
        $stats = [
            'total_users' => User::count(),
            'total_items' => Item::count(),
            'total_categories' => Category::count(),
            'total_orders' => Order::count(),
            'total_revenue' => Order::sum('total'),
        ];

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
        ]);
    }

    /**
     * List all users
     */
    public function users()
    {
        
        $users = User::paginate(15);

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
        ]);
    }

    /**
     * Edit user
     */
    public function editUser(User $user)
    {
        
        return Inertia::render('Admin/Users/Edit', [
            'user' => $user,
        ]);
    }

    /**
     * Update user
     */
    public function updateUser(Request $request, User $user)
    {
        
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $user->id,
            'is_admin' => 'boolean',
        ]);

        $user->update($data);

        return back()->with('success', 'Пользователь обновлен!');
    }

    /**
     * Delete user
     */
    public function deleteUser(User $user)
    {
        
        if ($user->id === auth()->id()) {
            return back()->withErrors(['error' => 'Вы не можете удалить себя!']);
        }

        $user->delete();

        return back()->with('success', 'Пользователь удален!');
    }

    /**
     * List all items
     */
    public function items()
    {
        
        $items = Item::with('category')->paginate(15);

        return Inertia::render('Admin/Items/Index', [
            'items' => $items,
        ]);
    }

    /**
     * Create item form
     */
    public function createItem()
    {
        
        $categories = Category::all();

        return Inertia::render('Admin/Items/Create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store item
     */
    public function storeItem(Request $request)
    {
        
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:items|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0.01',
            'stock' => 'required|integer|min:0',
            'category_id' => 'required|exists:categories,id',
        ]);

        Item::create($data);

        return redirect()->route('admin.items')->with('success', 'Товар создан!');
    }

    /**
     * Edit item form
     */
    public function editItem(Item $item)
    {
        
        $categories = Category::all();

        return Inertia::render('Admin/Items/Edit', [
            'item' => $item,
            'categories' => $categories,
        ]);
    }

    /**
     * Update item
     */
    public function updateItem(Request $request, Item $item)
    {
        
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:items,slug,' . $item->id,
            'description' => 'required|string',
            'price' => 'required|numeric|min:0.01',
            'stock' => 'required|integer|min:0',
            'category_id' => 'required|exists:categories,id',
        ]);

        $item->update($data);

        return back()->with('success', 'Товар обновлен!');
    }

    /**
     * Delete item
     */
    public function deleteItem(Item $item)
    {
        
        $item->delete();

        return back()->with('success', 'Товар удален!');
    }

    /**
     * List all orders
     */
    public function orders()
    {
        
        $orders = Order::with('user')->paginate(15);

        return Inertia::render('Admin/Orders/Index', [
            'orders' => $orders,
        ]);
    }

    /**
     * View order details
     */
    public function viewOrder(Order $order)
    {
        
        $order->load('items', 'user');

        return Inertia::render('Admin/Orders/Show', [
            'order' => $order,
        ]);
    }

    /**
     * Update order status
     */
    public function updateOrderStatus(Request $request, Order $order)
    {
        
        $data = $request->validate([
            'status' => 'required|in:pending,processing,shipped,delivered,cancelled',
        ]);

        $order->update($data);

        return back()->with('success', 'Статус заказа обновлен!');
    }

    /**
     * List all categories
     */
    public function categories()
    {
        
        $categories = Category::paginate(15);

        return Inertia::render('Admin/Categories/Index', [
            'categories' => $categories,
        ]);
    }

    /**
     * Create category form
     */
    public function createCategory()
    {

        $categories = Category::get();
        
        return Inertia::render('Admin/Categories/Create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store category
     */
    public function storeCategory(Request $request)
    {
        
        $data = $request->validate([
            'name' => 'required|string|unique:categories|max:255',
            'description' => 'nullable|string',
            'slug' => 'required|string|unique:categories|max:255',
            'parent_id' => 'nullable|exists:categories,id',
        ]);

        Category::create($data);

        return redirect()->route('admin.categories')->with('success', 'Категория создана!');
    }

    /**
     * Edit category form
     */
    public function editCategory(Category $category)
    {
        
        return Inertia::render('Admin/Categories/Edit', [
            'category' => $category,
        ]);
    }

    /**
     * Update category
     */
    public function updateCategory(Request $request, Category $category)
    {
        
        $data = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name,' . $category->id,
            'description' => 'nullable|string',
        ]);

        $category->update($data);

        return back()->with('success', 'Категория обновлена!');
    }

    /**
     * Delete category
     */
    public function deleteCategory(Category $category)
    {
        
        if ($category->items()->count() > 0) {
            return back()->withErrors(['error' => 'Невозможно удалить категорию с товарами!']);
        }

        $category->delete();

        return back()->with('success', 'Категория удалена!');
    }
}
