<?php

require_once 'vendor/autoload.php';

use DownShift\Container\Container;
use Melody\Core\functions as f;

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
$container['stacks'] = [
    'slider' => f\collect(STELE_MELODY_DIR . '/controls/stacks/slider/'),
    // 'toolbar' => f\collect(STELE_MELODY_DIR . '/controls/stacks/toolbar/'),
    // 'tracklist' => f\collect(STELE_MELODY_DIR . '/controls/stacks/tracklist/'),
];



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