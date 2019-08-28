<?php

/*
 * This file is part of shriker/flarum-pronouns.
 *
 * Copyright (c) 2019 Jodie Struthers.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Shriker\Pronouns;

use Flarum\Extend;
use Flarum\User\Event\Saving;
use Illuminate\Contracts\Events\Dispatcher;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js'),

    new Extend\Locales(__DIR__.'/resources/locale'),

    function (Dispatcher $events) {
        $events->subscribe(Listeners\AddPronouns::class);
        $events->listen(Saving::class, Listeners\SavePronouns::class);
    }
];
