<?php

namespace App\Policies;

use App\Models\User;

class AdminPolicy
{
    /**
     * Check if user is admin
     */
    public function isAdmin(User $user): bool
    {
        return $user->is_admin === true;
    }
}
