<?php

/**
 * EloquentReminder
 *
 * Reference from Sentinel package
 */
namespace App\Packages\AdminAuth\Eloquent;

use App\Models\BaseModel as Model;

class EloquentReminder extends Model
{
    /**
     * {@inheritDoc}
     */
    protected $table = 'admin_reminders';

    /**
     * {@inheritDoc}
     */
    protected $primaryKey = 'sid';

    /**
     * {@inheritDoc}
     */
    protected $fillable = [
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
        $this->attributes['completed'] = (int) (bool) $completed;
    }
}
