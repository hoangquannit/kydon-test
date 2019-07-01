<?php
namespace App\Packages\Repository\Events;

/**
 * Class RepositoryEntityCreated
 * @package App\Packages\Repository\Events
 */
class RepositoryEntityCreated extends RepositoryEventBase
{
    /**
     * @var string
     */
    protected $action = "created";
}
