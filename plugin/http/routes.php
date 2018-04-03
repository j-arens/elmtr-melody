<?php

use DownShift\WordPress\Router;

/**
 * New up Router
 */
$router = new Router('melody');



/**
 * Load routes
 */
$router->get('/download', 'Melody\Http\controllers\Download');



/**
 * Return instance
 */
return $router;