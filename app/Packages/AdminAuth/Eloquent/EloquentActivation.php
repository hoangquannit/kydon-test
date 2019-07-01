<?php

/**
 * EloquentActivation
 *
 * Reference from Sentinel package
 */

namespace App\Packages\AdminAuth\Eloquent;

use App\Packages\AdminAuth\Interfaces\Activations\ActivationInterface;
use App\Models\BaseModel as Model;

class EloquentActivation extends Model implements ActivationInterface
{
    /**
     * {@inheritDoc}
     */
    protected $table = 'admin_activations';

    /**
     * {@inheritDoc}
     */
    protected $primaryKey = 'sid';


    /**
     * {@inheritDoc}
     */
    protected $fillable = [
        'admin_user_sid',
        'code',
        'completed',
        'completed_at',
        'enable',
        'status',
        'updated_by',
        'created_by',
    ];

    /**
     * Get mutator for the "completed" attribute.
     *
     * @param  mixed  $completed
     * @return bool
     */
    public function getCompletedAttribute($completed)
    {
        return (bool) $completed;
    }

    /**
     * Set mutator for the "completed" attribute.
     *
     * @param  mixed  $completed
     * @return void
     */
    public function setCompletedAttribute($completed)
    {
        $this->attributes['completed'] = (bool) $completed;
    }

    /**
     * {@inheritDoc}
     */
    public function getCode()
    {
        return $this->attributes['code'];
    }
}
