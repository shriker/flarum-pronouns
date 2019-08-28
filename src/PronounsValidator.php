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

use Flarum\Foundation\AbstractValidator;

class PronounsValidator extends AbstractValidator
{
    protected $rules = [
        'pronouns' => ['nullable', 'string', 'max:20'],
    ];
}
