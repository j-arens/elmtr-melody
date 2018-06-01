<?php

use Kahlan\Filter\Filters;

// load files that only tests need
Filters::apply($this, 'bootstrap', function($next) {
    require 'constants.php';
    require 'dev/kahlan/mocks/wordpress.php';
    require MELODY_PLUGIN_DIR . '/notices.php';
    return $next();
});
