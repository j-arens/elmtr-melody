<?php

/*
Plugin Name: Elementor-Melody
Plugin URI: 
Description:
Version: 0.1.0
Author: Josh Arens
Author URI: jarens.me
Text Domain: elmtr-melody
Domain Path: /languages
*/

define('MELODY_VERSION', '0.1.0');
define('MELODY_ROOT', __FILE__);
define('MELODY_BASE_DIR', __DIR__);
define('MELODY_PLUGIN_DIR', __DIR__ . '/plugin');
define('MELODY_TD', 'elmtr-melody');

add_action('elementor/init', 'melodyInit');

/**
 * Entry points
 */
function melodyInit() {
    if (!melodyCompatible()) {   
        return;
    }

    require MELODY_PLUGIN_DIR . '/bootstrap.php';
}

/**
 * Pre-flight checks before booting plugin
 * 
 * @return boolean
 */
function melodyCompatible() {
    include MELODY_PLUGIN_DIR . '/notices.php';
    
    if (version_compare(PHP_VERSION, '5.4', '<')) { // @TODO: figure out min ver
        add_action('all_admin_notices', 'Melody\\Notices\\phpVersionNotice');
        return false;
    }

    if (version_compare(get_bloginfo('version'), '4.7', '<')) { // @TODO: test compat wp
        add_action('all_admin_notices', 'Melody\\Notices\\wpVersionNotice');
        return false;
    }

    if (defined('ELEMENTOR_VERSION') && version_compare(ELEMENTOR_VERSION, '1.9.3', '<')) { // @TODO: test elementor versions
        add_action('all_admin_notices', 'Melody\\Notices\\elementorVersionNotice');
        return false;
    }

    return true;
}
