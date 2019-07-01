<?php
namespace App\Packages\Repository\Events;

/**
 * Class RepositoryEntityDeleted
 * @package App\Packages\Repository\Events
 */
class RepositoryEntityDeleted extends RepositoryEventBase
{
    /**
     * @var string
     */
    protected $action = "deleted";
}
