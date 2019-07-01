<?php

/**
 * EloquentUser
 *
 * Reference from Sentinel package
 */
namespace App\Packages\AdminAuth\Eloquent;

use App\Models\Traits\ModelEventLogger;
use App\Packages\AdminAuth\Facades\Sentinel;
use App\Packages\AdminAuth\Interfaces\Persistences\PersistableInterface;
use App\Packages\AdminAuth\Interfaces\Roles\RoleableInterface;
use App\Packages\AdminAuth\Interfaces\Roles\RoleInterface;
use App\Packages\AdminAuth\Interfaces\Users\UserInterface;
use App\Models\BaseModel as Model;
use Cartalyst\Sentinel\Permissions\PermissibleInterface;
use Cartalyst\Sentinel\Permissions\PermissibleTrait;

class EloquentUser extends Model implements RoleableInterface, PermissibleInterface, PersistableInterface, UserInterface
{
    use PermissibleTrait;
    use ModelEventLogger;

    /**
     * {@inheritDoc}
     */
    protected $table = 'admin_users';

    /**
     * {@inheritDoc}
     */
    protected $primaryKey = 'sid';

    /**
     * {@inheritDoc}
     */
    protected $fillable = [
        'email',
        'password',
        'last_name',
        'enable',
        'status',
        'first_name',
        'permissions',
        'enable',
        'status',
        'updated_by',
        'created_by',
        'last_update_password',
    ];

    /**
     * {@inheritDoc}
     */
    protected $hidden = [
        'password',
    ];

    /**
     * {@inheritDoc}
     */
    protected $persistableKey = 'admin_user_sid';

    /**
     * {@inheritDoc}
     */
    protected $persistableRelationship = 'admin_persistences';

    /**
     * Array of login column names.
     *
     * @var array
     */
    protected $loginNames = ['email'];

    /**
     * The Eloquent roles model name.
     *
     * @var string
     */
    protected static $rolesModel = 'App\Packages\AdminAuth\Eloquent\EloquentRole';

    /**
     * The Eloquent persistences model name.
     *
     * @var string
     */
    protected static $persistencesModel = 'App\Packages\AdminAuth\Eloquent\EloquentPersistence';

    /**
     * The Eloquent activations model name.
     *
     * @var string
     */
    protected static $activationsModel = 'App\Packages\AdminAuth\Eloquent\EloquentActivation';

    /**
     * The Eloquent reminders model name.
     *
     * @var string
     */
    protected static $remindersModel = 'App\Packages\AdminAuth\Eloquent\EloquentReminder';

    /**
     * The Eloquent throttling model name.
     *
     * @var string
     */
    protected static $throttlingModel = 'App\Packages\AdminAuth\Eloquent\EloquentThrottle';

    /**
     * Returns an array of login column names.
     *
     * @return array
     */
    public function getLoginNames()
    {
        return $this->loginNames;
    }

    /**
     * Returns the roles relationship.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function roles()
    {
        return $this->belongsToMany(static::$rolesModel, 'admin_role_users', 'admin_user_sid', 'admin_role_sid')->withTimestamps();
    }

    /**
     * Returns the persistences relationship.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function admin_persistences()
    {
        return $this->hasMany(static::$persistencesModel, 'admin_user_sid');
    }

    /**
     * Returns the activations relationship.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function activations()
    {
        return $this->hasMany(static::$activationsModel, 'admin_user_sid');
    }

    /**
     * Returns the reminders relationship.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function reminders()
    {
        return $this->hasMany(static::$remindersModel, 'admin_user_sid');
    }

    /**
     * Returns the throttle relationship.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function throttle()
    {
        return $this->hasMany(static::$throttlingModel, 'admin_user_sid');
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
    public function getRoles()
    {
        return $this->roles;
    }

    /**
     * {@inheritDoc}
     */
    public function inRole($role)
    {
        if ($role instanceof RoleInterface) {
            $roleId = $role->getRoleId();
        }

        foreach ($this->roles as $instance) {
            if ($role instanceof RoleInterface) {
                if ($instance->getRoleId() === $roleId) {
                    return true;
                }
            } else {
                if ($instance->getRoleId() == $role || $instance->getRoleSlug() == $role) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * {@inheritDoc}
     */
    public function generatePersistenceCode()
    {
        return str_random(32);
    }

    /**
     * {@inheritDoc}
     */
    public function getUserId()
    {
        return $this->getKey();
    }

    /**
     * {@inheritDoc}
     */
    public function getPersistableId()
    {
        return $this->getKey();
    }

    /**
     * {@inheritDoc}
     */
    public function getPersistableKey()
    {
        return $this->persistableKey;
    }

    /**
     * {@inheritDoc}
     */
    public function setPersistableKey($key)
    {
        $this->persistableKey = $key;
    }

    /**
     * {@inheritDoc}
     */
    public function setPersistableRelationship($persistableRelationship)
    {
        $this->persistableRelationship = $persistableRelationship;
    }

    /**
     * {@inheritDoc}
     */
    public function getPersistableRelationship()
    {
        return $this->persistableRelationship;
    }

    /**
     * {@inheritDoc}
     */
    public function getUserLogin()
    {
        return $this->getAttribute($this->getUserLoginName());
    }

    /**
     * {@inheritDoc}
     */
    public function getUserLoginName()
    {
        return reset($this->loginNames);
    }

    /**
     * {@inheritDoc}
     */
    public function getUserPassword()
    {
        return $this->password;
    }

    /**
     * Returns the roles model.
     *
     * @return string
     */
    public static function getRolesModel()
    {
        return static::$rolesModel;
    }

    /**
     * Sets the roles model.
     *
     * @param  string  $rolesModel
     * @return void
     */
    public static function setRolesModel($rolesModel)
    {
        static::$rolesModel = $rolesModel;
    }

    /**
     * Returns the persistences model.
     *
     * @return string
     */
    public static function getPersistencesModel()
    {
        return static::$persistencesModel;
    }

    /**
     * Sets the persistences model.
     *
     * @param  string  $persistencesModel
     * @return void
     */
    public static function setPersistencesModel($persistencesModel)
    {
        static::$persistencesModel = $persistencesModel;
    }

    /**
     * Returns the activations model.
     *
     * @return string
     */
    public static function getActivationsModel()
    {
        return static::$activationsModel;
    }

    /**
     * Sets the activations model.
     *
     * @param  string  $activationsModel
     * @return void
     */
    public static function setActivationsModel($activationsModel)
    {
        static::$activationsModel = $activationsModel;
    }

    /**
     * Returns the reminders model.
     *
     * @return string
     */
    public static function getRemindersModel()
    {
        return static::$remindersModel;
    }

    /**
     * Sets the reminders model.
     *
     * @param  string  $remindersModel
     * @return void
     */
    public static function setRemindersModel($remindersModel)
    {
        static::$remindersModel = $remindersModel;
    }

    /**
     * Returns the throttling model.
     *
     * @return string
     */
    public static function getThrottlingModel()
    {
        return static::$throttlingModel;
    }

    /**
     * Sets the throttling model.
     *
     * @param  string  $throttlingModel
     * @return void
     */
    public static function setThrottlingModel($throttlingModel)
    {
        static::$throttlingModel = $throttlingModel;
    }

    /**
     * {@inheritDoc}
     */
    public function delete()
    {
        $isSoftDeleted = array_key_exists('App\Models\Traits\EnableTrait', class_uses($this));

        // Delete all related table
        if ($this->exists) {
            $this->activations()->delete();
            $this->admin_persistences()->delete();
            $this->reminders()->delete();
            $this->throttle()->delete();
            if (!$isSoftDeleted) {
                $this->roles()->detach();
            } else {
                foreach ($this->roles()->allRelatedIds() as $roleId) {
                    $pivotData = [
                        'enable' => FLG_DISABLE,
                    ];
                    if ($loggedId = object_get(Sentinel::getUser(), 'sid')) {
                        $pivotData['updated_by'] = $loggedId;
                    }
                    $this->roles()->updateExistingPivot($roleId, $pivotData);
                }
            }
        }
        return parent::delete();
    }

    /**
     * Dynamically pass missing methods to the user.
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
     * Creates a permissions object.
     *
     * @return \Cartalyst\Sentinel\Permissions\PermissionsInterface
     */
    protected function createPermissions()
    {
        $userPermissions = $this->permissions;

        $rolePermissions = [];

        foreach ($this->roles as $role) {
            $rolePermissions[] = $role->permissions;
        }

        return new static::$permissionsClass($userPermissions, $rolePermissions);
    }
}
