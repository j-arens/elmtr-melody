<?php

use Kahlan\Filter\Filters;

// setup test env
Filters::apply($this, 'bootstrap', function($next) {
    define('MELODY_TEST', true);
    require 'constants.php';
    require 'dev/kahlan/helpers.php';
    require 'dev/kahlan/mocks/wordpress.php';
    require MELODY_PLUGIN_DIR . '/notices.php';
    return $next();
});
