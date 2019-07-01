<?php

/**
 * Sentinel Facades
 *
 * Reference from Sentinel package
 */

namespace App\Packages\AdminAuth\Facades;

use Illuminate\Support\Facades\Facade;

class Sentinel extends Facade
{
    /**
     * {@inheritDoc}
     */
    protected static function getFacadeAccessor()
    {
        return 'sentinel';
    }
}
