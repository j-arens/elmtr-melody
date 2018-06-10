<?php

/*
Plugin Name: Elementor-Melody
Plugin URI: 
Version: 1.0.0
Description:
Author: <a href="https://jarens.me">Josh Arens</a>
Author URI: https://jarens.me
Text Domain: elmtr-melody
Domain Path: /languages
Tags:
*/

/**
 * Load constants
 */
require 'constants.php';

/**
 * Entry point
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

/**
 * Hook in to elementor/init
 */
add_action('elementor/init', 'melodyInit');
