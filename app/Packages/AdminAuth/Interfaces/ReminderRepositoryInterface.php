<?php

/**
 * ReminderRepositoryInterface
 *
 * Reference from Sentinel package
 */

namespace App\Packages\AdminAuth\Interfaces;

use App\Packages\AdminAuth\Interfaces\Users\UserInterface;

interface ReminderRepositoryInterface
{
    /**
     * Create a new reminder record and code.
     *
     * @param  \App\Packages\AdminAuth\Interfaces\Users\UserInterface  $user
     * @return string
     */
    public function create(UserInterface $user);

    /**
     * Check if a valid reminder exists.
     *
     * @param  \Cartalyst\Sentinel\Users\UserInterface  $user
     * @param  string  $code
     * @return bool
     */
    public function exists(UserInterface $user, $code = null);

    /**
     * Complete reminder for the given user.
     *
     * @param  \App\Packages\AdminAuth\Interfaces\Users\UserInterface  $user
     * @param  string  $code
     * @param  string  $password
     * @return bool
     */
    public function complete(UserInterface $user, $code, $password);

    /**
     * Remove expired reminder codes.
     *
     * @return int
     */
    public function removeExpired();
}
