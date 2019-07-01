<?php

/**
 * ActivationCheckpoint
 *
 * Reference from Sentinel package
 */

namespace App\Packages\AdminAuth\Checkpoints;

use App\Packages\AdminAuth\Interfaces\Activations\ActivationRepositoryInterface;
use App\Packages\AdminAuth\Interfaces\Users\UserInterface;

class ActivationCheckpoint implements CheckpointInterface
{
    use AuthenticatedCheckpoint;

    /**
     * The activation repository.
     *
     * @var \App\Packages\AdminAuth\Interfaces\Activations\ActivationRepositoryInterface
     */
    protected $activations;

    /**
     * Create a new activation checkpoint.
     *
     * @param  \App\Packages\AdminAuth\Interfaces\Activations\ActivationRepositoryInterface  $activations
     * @return void
     */
    public function __construct(ActivationRepositoryInterface $activations)
    {
        $this->activations = $activations;
    }

    /**
     * {@inheritDoc}
     */
    public function login(UserInterface $user)
    {
        return $this->checkActivation($user);
    }

    /**
     * {@inheritDoc}
     */
    public function check(UserInterface $user)
    {
        return $this->checkActivation($user);
    }

    /**
     * Checks the activation status of the given user.
     *
     * @param  \App\Packages\AdminAuth\Interfaces\Users\UserInterface  $user
     * @return bool
     * @throws \App\Packages\AdminAuth\Checkpoints\NotActivatedException
     */
    protected function checkActivation(UserInterface $user)
    {
        $completed = $this->activations->completed($user);

        if (! $completed) {
            $exception = new NotActivatedException('Your account has not been activated yet.');

            $exception->setUser($user);

            throw $exception;
        }
    }
}
