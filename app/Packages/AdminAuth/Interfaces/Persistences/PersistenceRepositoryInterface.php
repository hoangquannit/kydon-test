<?php

/**
 * PersistenceRepositoryInterface
 *
 * Reference from Sentinel package
 */

namespace App\Packages\AdminAuth\Interfaces\Persistences;

interface PersistenceRepositoryInterface
{
    /**
     * Checks for a persistence code in the current session.
     *
     * @return string
     */
    public function check();

    /**
     * Finds a persistence by persistence code.
     *
     * @param  string  $code
     * @return \App\Packages\AdminAuth\Interfaces\Persistences\PersistenceInterface|false
     */
    public function findByPersistenceCode($code);

    /**
     * Finds a user by persistence code.
     *
     * @param  string  $code
     * @return \App\Packages\AdminAuth\Interfaces\Users\UserInterface|false
     */
    public function findUserByPersistenceCode($code);

    /**
     * Adds a new user persistence to the current session and attaches the user.
     *
     * @param  \App\Packages\AdminAuth\Interfaces\Persistences\PersistenceInterface  $persistable
     * @param  bool  $remember
     * @return bool
     */
    public function persist(PersistableInterface $persistable, $remember = false);

    /**
     * Adds a new user persistence, to remember.
     *
     * @param  \App\Packages\AdminAuth\Interfaces\Persistences\PersistableInterface  $persistable
     * @return bool
     */
    public function persistAndRemember(PersistableInterface $persistable);

    /**
     * Removes the persistence bound to the current session.
     *
     * @param  \App\Packages\AdminAuth\Interfaces\Persistences\PersistableInterface  $persistable
     * @return bool|null
     */
    public function forget();

    /**
     * Removes the given persistence code.
     *
     * @param  string  $code
     * @return bool|null
     */
    public function remove($code);

    /**
     * Flushes persistences for the given user.
     *
     * @param  \App\Packages\AdminAuth\Interfaces\Persistences\PersistableInterface  $persistable
     * @param  bool  $forget
     * @return void
     */
    public function flush(PersistableInterface $persistable, $forget = true);
}
