<?php

/*
 * This file is part of shriker/flarum-pronouns.
 *
 * Copyright (c) 2019 Jodie Struthers.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Shriker\Pronouns\Listeners;

use Flarum\Api\Event\Serializing;
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Api\Serializer\UserSerializer;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Events\Dispatcher;

class AddPronouns
{
    protected $settings;

    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function subscribe(Dispatcher $events)
    {
        $events->listen(Serializing::class, [$this, 'prepareApiAttributes']);
    }

    public function prepareApiAttributes(Serializing $event)
    {

        // Make pronouns available via User
        if ($event->isSerializer(UserSerializer::class)) {
            $event->attributes['pronouns'] = $event->model->pronouns;
        }

        // Make settings available via Forum
        if ($event->isSerializer(ForumSerializer::class)) {
            $event->attributes['pronounsPrefix'] = $this->settings->get('shriker-pronouns.pronouns_prefix');
        }
    }
}
