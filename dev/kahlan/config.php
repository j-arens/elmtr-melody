<?php

use Kahlan\Filter\Filters;

// setup test env
Filters::apply($this, 'bootstrap', function($next) {
    define('MELODY_TEST', true);
    require 'constants.php';
    require 'dev/kahlan/helpers.php';
    require 'dev/kahlan/mocks/wordpress.php';
    return $next();
});

// elementor mocks
Filters::apply($this, 'namespaces', function($next) {
    $this->autoloader()->addPsr4('Elementor\\', 'dev/kahlan/mocks/elementor');
    return $next();
});
