<?php

/**
 * IlluminateReminderRepository
 *
 * Reference from Sentinel package
 */
namespace App\Packages\AdminAuth\Repositories;

use App\Packages\AdminAuth\Interfaces\ReminderRepositoryInterface;
use App\Packages\AdminAuth\Interfaces\Users\UserInterface;
use App\Packages\AdminAuth\Interfaces\Users\UserRepositoryInterface;
use Carbon\Carbon;
use Cartalyst\Support\Traits\RepositoryTrait;

class IlluminateReminderRepository implements ReminderRepositoryInterface
{
    use RepositoryTrait;

    /**
     * The user repository.
     *
     * @var \App\Packages\AdminAuth\Interfaces\Users\UserRepositoryInterface
     */
    protected $users;

    /**
     * The Eloquent reminder model name.
     *
     * @var string
     */
    protected $model = 'App\Packages\AdminAuth\Eloquent\EloquentReminder';

    /**
     * The expiration time in seconds.
     *
     * @var int
     */
    protected $expires = 259200;

    /**
     * Create a new Illuminate reminder repository.
     *
     * @param  \App\Packages\AdminAuth\Interfaces\Users\UserRepositoryInterface  $users
     * @param  string  $model
     * @param  int  $expires
     * @return void
     */
    public function __construct(UserRepositoryInterface $users, $model = null, $expires = null)
    {
        $this->users = $users;

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
        $reminder = $this->createModel();

        $code = $this->generateReminderCode();

        $reminder->fill([
            'code'      => $code,
            'completed' => false,
        ]);

        $reminder->admin_user_sid = $user->getUserId();

        $reminder->save();

        return $reminder;
    }

    /**
     * {@inheritDoc}
     */
    public function exists(UserInterface $user, $code = null)
    {
        $expires = $this->expires();

        $reminder = $this
            ->createModel()
            ->newQuery()
            ->where('admin_user_sid', $user->getUserId())
            ->where('completed', false)
            ->where('created_at', '>', $expires);

        if ($code) {
            $reminder->where('code', $code);
        }

        return $reminder->first() ?: false;
    }

    /**
     * {@inheritDoc}
     */
    public function complete(UserInterface $user, $code, $password)
    {
        $expires = $this->expires();

        $reminder = $this
            ->createModel()
            ->newQuery()
            ->where('admin_user_sid', $user->getUserId())
            ->where('code', $code)
            ->where('completed', false)
            ->where('created_at', '>', $expires)
            ->first();

        if ($reminder === null) {
            return false;
        }

        $credentials = compact('password');

        $valid = $this->users->validForUpdate($user, $credentials);

        if ($valid === false) {
            return false;
        }

        $this->users->update($user, $credentials);

        $reminder->fill([
            'completed'    => true,
            'completed_at' => Carbon::now(),
        ]);

        $reminder->save();

        return true;
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
     * Returns a random string for a reminder code.
     *
     * @return string
     */
    protected function generateReminderCode()
    {
        return str_random(32);
    }
}
