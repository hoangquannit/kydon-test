<?php

/**
 * EloquentPersistence
 *
 * Reference from Sentinel package
 */

namespace App\Packages\AdminAuth\Eloquent;

use App\Packages\AdminAuth\Interfaces\Persistences\PersistenceInterface;
use App\Models\BaseModel as Model;

class EloquentPersistence extends Model implements PersistenceInterface
{
    /**
     * {@inheritDoc}
     */
    protected $table = 'admin_persistences';

    /**
     * {@inheritDoc}
     */
    protected $primaryKey = 'sid';

    /**
     * The users model name.
     *
     * @var string
     */
    protected static $usersModel = 'App\Packages\AdminAuth\Eloquent\EloquentUser';

    /**
     * @var array
     */
    protected $fillable = [
        'admin_user_sid',
        'code',
        'enable',
        'status',
        'updated_by',
        'created_by',
    ];

    /**
     * {@inheritDoc}
     */
    public function user()
    {
        return $this->belongsTo(static::$usersModel, 'admin_user_sid', 'sid');
    }

    /**
     * Get the users model.
     *
     * @return string
     */
    public static function getUsersModel()
    {
        return static::$usersModel;
    }

    /**
     * Set the users model.
     *
     * @param  string  $usersModel
     * @return void
     */
    public static function setUsersModel($usersModel)
    {
        static::$usersModel = $usersModel;
    }
}
