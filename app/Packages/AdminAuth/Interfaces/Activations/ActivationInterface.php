<?php

/**
 * ActivationInterface
 *
 * Reference from Sentinel package
 */

namespace App\Packages\AdminAuth\Interfaces\Activations;

interface ActivationInterface
{
    /**
     * Return the random string used as activation code.
     *
     * @return string
     */
    public function getCode();
}
