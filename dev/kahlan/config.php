<?php

use Kahlan\Filter\Filters;

Filters::apply($this, 'bootstrap', function($next) {
    require 'constants.php';
    return $next();
});
