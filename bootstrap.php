<?php

require_once 'vendor/autoload.php';

use Stele\Container\Container;

/**
 * New up container
 */
$container = Container::getInstance();



/**
 * Bind object deps
 */
$container->bind('Melody\core\Plugin');
$container->bind('Melody\core\View');



/**
 * Bind widget control stacks
 */
$container->bind('melodyControlStacks', function() {
    $dir = STELE_MELODY_DIR . '/controls/stacks/';

    if (!is_dir($dir)) {
        return [];
    }

    $stacks = array_diff(scandir($dir), ['..', '.']);

    return array_map(function($stack) use($dir) {
        return include $dir . $stack;
    }, $stacks);
});



/**
 * Resolve Plugin object, kick things off
 */
$container->resolve('Melody\core\Plugin');