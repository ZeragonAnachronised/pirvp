<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * User wishes (favorites).
     */
    public function wishes()
    {
        return $this->hasMany(Wish::class);
    }

    /**
     * User carts.
     */
    public function carts()
    {
        return $this->hasMany(Cart::class);
    }

    /**
     * User orders.
     */
    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    /**
     * User reviews.
     */
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}
