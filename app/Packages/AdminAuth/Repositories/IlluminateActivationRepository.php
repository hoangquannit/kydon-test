<?php

/**
 * IlluminateActivationRepository
 *
 * Reference from Sentinel package
 */

namespace App\Packages\AdminAuth\Repositories;

use App\Packages\AdminAuth\Interfaces\Activations\ActivationRepositoryInterface;
use App\Packages\AdminAuth\Interfaces\Users\UserInterface;
use Cartalyst\Support\Traits\RepositoryTrait;
use Carbon\Carbon;

class IlluminateActivationRepository implements ActivationRepositoryInterface
{
    use RepositoryTrait;

    /**
     * The Eloquent activation model name.
     *
     * @var string
     */
    protected $model = 'App\Packages\AdminAuth\Eloquent\EloquentActivation';

    /**
     * The activation expiration time, in seconds.
     *
     * @var int
     */
    protected $expires = 259200;

    /**
     * Create a new Illuminate activation repository.
     *
     * @param  string  $model
     * @param  int  $expires
     * @return void
     */
    public function __construct($model = null, $expires = null)
    {
        if (isset($model)) {
            $this->model = $model;
        }

        if (isset($expires)) {
            $this->expires = $expires;
        }
    }

    /**
     * {@inheritDoc}
     */
    public function create(UserInterface $user)
    {
        $activation = $this->createModel();

        $code = $this->generateActivationCode();

        $activation->fill(compact('code'));

        $activation->admin_user_sid = $user->getUserId();

        $activation->save();

        return $activation;
    }

    /**
     * {@inheritDoc}
     */
    public function exists(UserInterface $user, $code = null)
    {
        $expires = $this->expires();

        $activation = $this
            ->createModel()
            ->newQuery()
            ->where('admin_user_sid', $user->getUserId())
            ->where('completed', false)
            ->where('created_at', '>', $expires);

        if ($code) {
            $activation->where('code', $code);
        }

        return $activation->first() ?: false;
    }

    /**
     * {@inheritDoc}
     */
    public function complete(UserInterface $user, $code)
    {
        $expires = $this->expires();

        $activation = $this
            ->createModel()
            ->newQuery()
            ->where('admin_user_sid', $user->getUserId())
            ->where('code', $code)
            ->where('completed', false)
            ->where('created_at', '>', $expires)
            ->first();

        if ($activation === null) {
            return false;
        }

        $activation->fill([
            'completed'    => true,
            'completed_at' => Carbon::now(),
        ]);

        $activation->save();

        return true;
    }

    /**
     * {@inheritDoc}
     */
    public function completed(UserInterface $user)
    {
        $activation = $this
            ->createModel()
            ->newQuery()
            ->where('admin_user_sid', $user->getUserId())
            ->where('completed', true)
            ->first();

        return $activation ?: false;
    }

    /**
     * {@inheritDoc}
     */
    public function remove(UserInterface $user)
    {
        $activation = $this->completed($user);

        if ($activation === false) {
            return false;
        }

        return $activation->delete();
    }

    /**
     * {@inheritDoc}
     */
    public function removeExpired()
    {
        $expires = $this->expires();

        return $this
            ->createModel()
            ->newQuery()
            ->where('completed', false)
            ->where('created_at', '<', $expires)
            ->delete();
    }

    /**
     * Returns the expiration date.
     *
     * @return \Carbon\Carbon
     */
    protected function expires()
    {
        return Carbon::now()->subSeconds($this->expires);
    }

    /**
     * Return a random string for an activation code.
     *
     * @return string
     */
    protected function generateActivationCode()
    {
        return str_random(32);
    }
}
