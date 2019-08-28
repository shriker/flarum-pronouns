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

use Shriker\Pronouns\PronounsValidator;
use Flarum\User\Event\Saving;
use Illuminate\Contracts\Events\Dispatcher;

class SavePronouns
{
    protected $validator;

    protected $events;

    public function __construct(PronounsValidator $validator, Dispatcher $events)
    {
        $this->validator = $validator;
        $this->events = $events;
    }

    public function handle(Saving $event)
    {
        $attributes = array_get($event->data, 'attributes', []);

        if (array_key_exists('pronouns', $attributes)) {

            $this->validator->assertValid($attributes);

            $user = $event->user;
            $user->pronouns = $attributes['pronouns'] ? ($attributes['pronouns']) : null;
        }
    }
}
