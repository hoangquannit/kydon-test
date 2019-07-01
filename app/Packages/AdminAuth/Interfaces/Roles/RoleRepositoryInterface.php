<?php

/**
 * RoleRepositoryInterface
 *
 * Reference from Sentinel package
 */

namespace App\Packages\AdminAuth\Interfaces\Roles;

interface RoleRepositoryInterface
{
    /**
     * Finds a role by the given primary key.
     *
     * @param  int  $id
     * @return \App\Packages\AdminAuth\Interfaces\Roles\RoleInterface
     */
    public function findById($id);

    /**
     * Finds a role by the given slug.
     *
     * @param  string  $slug
     * @return \App\Packages\AdminAuth\Interfaces\Roles\RoleInterface
     */
    public function findBySlug($slug);

    /**
     * Finds a role by the given name.
     *
     * @param  string  $name
     * @return \App\Packages\AdminAuth\Interfaces\Roles\RoleInterface
     */
    public function findByName($name);
}
