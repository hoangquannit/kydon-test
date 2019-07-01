<?php

/**
 * AuthenticatedCheckpoint
 *
 * Reference from Sentinel package
 */

namespace App\Packages\AdminAuth\Checkpoints;

use App\Packages\AdminAuth\Interfaces\Users\UserInterface;

trait AuthenticatedCheckpoint
{
    /**
     * {@inheritDoc}
     */
    public function fail(UserInterface $user = null)
    {
    }
}
