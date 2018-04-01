<?php

require_once 'vendor/autoload.php';

use DownShift\Container\Container;
use Melody\Core\Functions as f;

/**
 * New up container
 */
$container = new Container;



/**
 * Bind implementations
 */
$container->bind('Melody\Core\ViewInterface', 'Melody\Core\View');



/**
 * Bind widget configs
 */
$container['widgetConfigs'] = f\collect(STELE_MELODY_DIR . '/widgets/configs/');



/**
 * Bind widget control stacks
 */
$container['sliderControlStack'] = f\collect(STELE_MELODY_DIR . '/controls/stacks/slider');



/**
 * Resolve Plugin object, kick things off
 */
$plugin = $container->make('Melody\Core\Plugin');
$plugin->setContainer($container);



/**
 * Setup router
 */
$router = include STELE_MELODY_DIR . '/http/routes.php';
$router->bind($container);
$router->listen();