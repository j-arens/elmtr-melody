<?php

use DownShift\WordPress\Router;

/**
 * New up Router
 */
$router = new Router('melody');



/**
 * Load routes
 */
$router->get('/download', 'Melody\Http\Controllers\Download');



/**
 * Return instance
 */
return $router;