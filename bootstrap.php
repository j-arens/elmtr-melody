<?php

require_once 'vendor/autoload.php';

use DownShift\Container\Container;

/**
 * New up container
 */
$container = new Container;
$container::setInstance($container);



/**
 * Bind implementations
 */
$container->bind('Melody\Core\ViewInterface', 'Melody\Core\View');



/**
 * Bind widget control stacks
 */
$container['melodyControlStacks'] = function() {
    $dir = STELE_MELODY_DIR . '/controls/stacks/';

    if (!is_dir($dir)) {
        return [];
    }

    $stacks = array_diff(scandir($dir), ['..', '.']);

    return array_map(function($stack) use($dir) {
        return include $dir . $stack;
    }, $stacks);
};



/**
 * Resolve Plugin object, kick things off
 */
$container->make('Melody\Core\Plugin');



/**
 * Setup router
 */
$router = include STELE_MELODY_DIR . '/http/routes.php';
$router->bind($container);
$router->listen();