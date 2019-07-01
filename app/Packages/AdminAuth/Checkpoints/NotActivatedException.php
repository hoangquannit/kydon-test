<?php

/**
 * NotActivatedException
 *
 * Reference from Sentinel package
 */


namespace App\Packages\AdminAuth\Checkpoints;

use App\Packages\AdminAuth\Interfaces\Users\UserInterface;
use RuntimeException;

class NotActivatedException extends RuntimeException
{
    /**
     * The user which caused the exception.
     *
     * @var \App\Packages\AdminAuth\Interfaces\Users\UserInterface
     */
    protected $user;

    /**
     * Returns the user.
     *
     * @return \App\Packages\AdminAuth\Interfaces\Users\UserInterface
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * Sets the user associated with Sentinel (does not log in).
     *
     * @param  \App\Packages\AdminAuth\Interfaces\Users\UserInterface
     * @return void
     */
    public function setUser(UserInterface $user)
    {
        $this->user = $user;
    }
}
