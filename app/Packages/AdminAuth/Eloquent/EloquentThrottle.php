<?php

/**
 * EloquentThrottle
 *
 * Reference from Sentinel package
 */
namespace App\Packages\AdminAuth\Eloquent;

use App\Models\BaseModel as Model;

class EloquentThrottle extends Model
{
    /**
     * {@inheritDoc}
     */
    protected $table = 'admin_throttle';

    /**
     * {@inheritDoc}
     */
    protected $fillable = [
        'ip',
        'type',
        'enable',
        'status',
        'updated_by',
        'created_by',
    ];
}
