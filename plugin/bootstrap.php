<?php

require_once MELODY_BASE_DIR . '/vendor/autoload.php';

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
    'slider' => f\collect(MELODY_PLUGIN_DIR . '/controls/stacks/slider/'),
    'toolbar' => f\collect(MELODY_PLUGIN_DIR . '/controls/stacks/toolbar/'),
    'tracklist' => f\collect(MELODY_PLUGIN_DIR . '/controls/stacks/tracklist/'),
];



/**
 * Resolve Plugin object, kick things off
 */
$container->make('Melody\Core\Plugin');



/**
 * Setup router
 */
$router = include MELODY_PLUGIN_DIR . '/http/routes.php';
$router->bind($container);
$router->listen();