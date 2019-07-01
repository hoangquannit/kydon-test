<?php
namespace App\Packages\Repository\Events;

/**
 * Class RepositoryEntityUpdated
 * @package App\Packages\Repository\Events
 */
class RepositoryEntityUpdated extends RepositoryEventBase
{
    /**
     * @var string
     */
    protected $action = "updated";
}
