<?php

/**
 * ActivationRepositoryInterface
 *
 * Reference from Sentinel package
 */

namespace App\Packages\AdminAuth\Interfaces\Activations;

use App\Packages\AdminAuth\Interfaces\Users\UserInterface;

interface ActivationRepositoryInterface
{
    /**
     * Create a new activation record and code.
     *
     * @param  \App\Packages\AdminAuth\Interfaces\Users\UserInterface  $user
     * @return \App\Packages\AdminAuth\Interfaces\Activations\ActivationInterface
     */
    public function create(UserInterface $user);

    /**
     * Checks if a valid activation for the given user exists.
     *
     * @param  \App\Packages\AdminAuth\Interfaces\Users\UserInterface  $user
     * @param  string  $code
     * @return \App\Packages\AdminAuth\Interfaces\Activations\ActivationInterface|bool
     */
    public function exists(UserInterface $user, $code = null);

    /**
     * Completes the activation for the given user.
     *
     * @param  \App\Packages\AdminAuth\Interfaces\Users\UserInterface  $user
     * @param  string  $code
     * @return bool
     */
    public function complete(UserInterface $user, $code);

    /**
     * Checks if a valid activation has been completed.
     *
     * @param  \App\Packages\AdminAuth\Interfaces\Users\UserInterface  $user
     * @return \App\Packages\AdminAuth\Interfaces\Activations\ActivationInterface|bool
     */
    public function completed(UserInterface $user);

    /**
     * Remove an existing activation (deactivate).
     *
     * @param  \App\Packages\AdminAuth\Interfaces\Users\UserInterface  $user
     * @return bool|null
     */
    public function remove(UserInterface $user);

    /**
     * Remove expired activation codes.
     *
     * @return int
     */
    public function removeExpired();
}
