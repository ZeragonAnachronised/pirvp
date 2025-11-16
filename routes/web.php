<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\WishController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;

Route::get('/', function () {
    return redirect()->route('items.index');
});

Route::get('/login', [AuthController::class, 'showLogin'])->name('auth.showLogin');
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::get('/register', [AuthController::class, 'showRegister'])->name('auth.showRegister');
Route::post('/register', [AuthController::class, 'register'])->name('auth.register');

Route::get('/items', [ItemController::class, 'index'])->name('items.index');
Route::get('/items/search', [ItemController::class, 'search'])->name('items.search');
Route::get('/items/{id}', [ItemController::class, 'show'])->name('items.show');
Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
Route::get('/categories/{id}', [CategoryController::class, 'show'])->name('categories.show');
Route::get('/reviews/{item}', [ReviewController::class, 'index'])->name('reviews.index');


Route::middleware('auth')->group(function () {

    Route::get('/logout', [AuthController::class, 'logout'])->name('auth.logout');
    Route::get('/profile', [AuthController::class, 'showProfile'])->name('auth.showProfile');
    Route::post('/profile', [AuthController::class, 'updateProfile'])->name('auth.updateProfile');
    Route::get('/change-password', [AuthController::class, 'showChangePassword'])->name('auth.showChangePassword');
    Route::post('/change-password', [AuthController::class, 'changePassword'])->name('auth.changePassword');
    
    Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
    Route::post('/cart/add/{id}/{quantity}', [CartController::class, 'add'])->name('cart.add');
    Route::delete('/cart/item/{cartItem}', [CartController::class, 'removeItem'])->name('cart.removeItem');
    Route::put('/cart/item/{cartItem}', [CartController::class, 'updateItem'])->name('cart.updateItem');
    Route::get('/cart/clear', [CartController::class, 'clear'])->name('cart.clear');

    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/{order}', [OrderController::class, 'show'])->name('orders.show');
    Route::get('/checkout', [OrderController::class, 'checkout'])->name('orders.checkout');
    Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');
    Route::post('/orders/{order}/cancel', [OrderController::class, 'cancel'])->name('orders.cancel');

    Route::post('/reviews/{item}', [ReviewController::class, 'store'])->name('reviews.store');
    Route::put('/reviews/{review}', [ReviewController::class, 'update'])->name('reviews.update');
    Route::delete('/reviews/{review}', [ReviewController::class, 'destroy'])->name('reviews.destroy');

    Route::get('/wishes', [WishController::class, 'index'])->name('wishes.index');
    Route::post('/wishes/add/{item}', [WishController::class, 'add'])->name('wishes.add');
    Route::delete('/wishes/remove/{item}', [WishController::class, 'remove'])->name('wishes.remove');
    Route::post('/wishes/clear', [WishController::class, 'clear'])->name('wishes.clear');
});

// Admin routes
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminController::class, 'dashboard'])->name('dashboard');
    
    // Users management
    Route::get('/users', [AdminController::class, 'users'])->name('users');
    Route::get('/users/{user}/edit', [AdminController::class, 'editUser'])->name('users.edit');
    Route::put('/users/{user}', [AdminController::class, 'updateUser'])->name('users.update');
    Route::delete('/users/{user}', [AdminController::class, 'deleteUser'])->name('users.delete');
    
    // Items management
    Route::get('/items', [AdminController::class, 'items'])->name('items');
    Route::get('/items/create', [AdminController::class, 'createItem'])->name('items.create');
    Route::post('/items', [AdminController::class, 'storeItem'])->name('items.store');
    Route::get('/items/{item}/edit', [AdminController::class, 'editItem'])->name('items.edit');
    Route::put('/items/{item}', [AdminController::class, 'updateItem'])->name('items.update');
    Route::delete('/items/{item}', [AdminController::class, 'deleteItem'])->name('items.delete');
    
    // Orders management
    Route::get('/orders', [AdminController::class, 'orders'])->name('orders');
    Route::get('/orders/{order}', [AdminController::class, 'viewOrder'])->name('orders.show');
    Route::put('/orders/{order}/status', [AdminController::class, 'updateOrderStatus'])->name('orders.status');
    
    // Categories management
    Route::get('/categories', [AdminController::class, 'categories'])->name('categories');
    Route::get('/categories/create', [AdminController::class, 'createCategory'])->name('categories.create');
    Route::post('/categories', [AdminController::class, 'storeCategory'])->name('categories.store');
    Route::get('/categories/{category}/edit', [AdminController::class, 'editCategory'])->name('categories.edit');
    Route::put('/categories/{category}', [AdminController::class, 'updateCategory'])->name('categories.update');
    Route::delete('/categories/{category}', [AdminController::class, 'deleteCategory'])->name('categories.delete');
});
