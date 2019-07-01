<?php

/**
 * ThrottleRepositoryInterface
 *
 * Reference from Sentinel package
 */

namespace App\Packages\AdminAuth\Interfaces;

use App\Packages\AdminAuth\Interfaces\Users\UserInterface;

interface ThrottleRepositoryInterface
{
    /**
     * Returns the global throttling delay, in seconds.
     *
     * @return int
     */
    public function globalDelay();

    /**
     * Returns the IP address throttling delay, in seconds.
     *
     * @param  string  $ipAddress
     * @return int
     */
    public function ipDelay($ipAddress);

    /**
     * Returns the throttling delay for the given user, in seconds.
     *
     * @param  \App\Packages\AdminAuth\Interfaces\Users\UserInterface  $user
     * @return int
     */
    public function userDelay(UserInterface $user);

    /**
     * Logs a new throttling entry.
     *
     * @param  string  $ipAddress
     * @param  \App\Packages\AdminAuth\Interfaces\Users\UserInterface  $user
     * @return void
     */
    public function log($ipAddress = null, UserInterface $user = null);

    /**
     * @param UserInterface|null $user
     * @return mixed
     */
    public function removeUserThrottle($userId);
}
