<?php

/**
 * EloquentRole
 *
 * Reference from Sentinel package
 */
namespace App\Packages\AdminAuth\Eloquent;

use Cartalyst\Sentinel\Permissions\PermissibleInterface;
use App\Packages\AdminAuth\Interfaces\Roles\RoleInterface;
use Cartalyst\Sentinel\Permissions\PermissibleTrait;
use App\Models\BaseModel as Model;

class EloquentRole extends Model implements RoleInterface, PermissibleInterface
{
    use PermissibleTrait;

    /**
     * {@inheritDoc}
     */
    protected $table = 'admin_roles';

    /**
     * {@inheritDoc}
     */
    protected $primaryKey = 'sid';


    /**
     * {@inheritDoc}
     */
    protected $fillable = [
        'name',
        'slug',
        'permissions',
        'enable',
        'status',
        'updated_by',
        'created_by',
    ];

    /**
     * The Eloquent users model name.
     *
     * @var string
     */
    protected static $usersModel = 'App\Packages\AdminAuth\Eloquent\EloquentUser';

    /**
     * {@inheritDoc}
     */
    public function delete()
    {
        $isSoftDeleted = array_key_exists('App\Models\Traits\EnableTrait', class_uses($this));

        if ($this->exists && ! $isSoftDeleted) {
            $this->users()->detach();
        }

        return parent::delete();
    }

    /**
     * The Users relationship.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function users()
    {
        return $this->belongsToMany(static::$usersModel, 'admin_role_users', 'admin_role_sid', 'admin_user_sid')->withTimestamps();
    }

    /**
     * Get mutator for the "permissions" attribute.
     *
     * @param  mixed  $permissions
     * @return array
     */
    public function getPermissionsAttribute($permissions)
    {
        return $permissions ? json_decode($permissions, true) : [];
    }

    /**
     * Set mutator for the "permissions" attribute.
     *
     * @param  mixed  $permissions
     * @return void
     */
    public function setPermissionsAttribute(array $permissions)
    {
        $this->attributes['permissions'] = $permissions ? json_encode($permissions) : '';
    }

    /**
     * {@inheritDoc}
     */
    public function getRoleId()
    {
        return $this->getKey();
    }

    /**
     * {@inheritDoc}
     */
    public function getRoleSlug()
    {
        return $this->slug;
    }

    /**
     * {@inheritDoc}
     */
    public function getUsers()
    {
        return $this->users;
    }

    /**
     * {@inheritDoc}
     */
    public static function getUsersModel()
    {
        return static::$usersModel;
    }

    /**
     * {@inheritDoc}
     */
    public static function setUsersModel($usersModel)
    {
        static::$usersModel = $usersModel;
    }

    /**
     * Dynamically pass missing methods to the permissions.
     *
     * @param  string  $method
     * @param  array  $parameters
     * @return mixed
     */
    public function __call($method, $parameters)
    {
        $methods = ['hasAccess', 'hasAnyAccess'];

        if (in_array($method, $methods)) {
            $permissions = $this->getPermissionsInstance();

            return call_user_func_array([$permissions, $method], $parameters);
        }

        return parent::__call($method, $parameters);
    }

    /**
     * {@inheritDoc}
     */
    protected function createPermissions()
    {
        return new static::$permissionsClass($this->permissions);
    }
}
