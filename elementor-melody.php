<?php

/*
Plugin Name: Elementor-Melody
Plugin URI: 
Version: 1.0.0-alpha.1
Description:
Author: <a href="https://jarens.me">Josh Arens</a>
Author URI: https://jarens.me
Text Domain: elmtr-melody
Domain Path: /languages
Tags:
*/

require 'constants.php';
require MELODY_PLUGIN_DIR . '/notices.php';

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
    if (version_compare(PHP_VERSION, '5.4', '<')) {
        add_action('all_admin_notices', 'Melody\\Notices\\phpVersionNotice');
        return false;
    }

    if (version_compare(get_bloginfo('version'), '4.7', '<')) {
        add_action('all_admin_notices', 'Melody\\Notices\\wpVersionNotice');
        return false;
    }

    if (version_compare(ELEMENTOR_VERSION, '2.1.0', '<')) {
        add_action('all_admin_notices', 'Melody\\Notices\\elementorVersionNotice');
        return false;
    }

    return true;
}

/**
 * Check for elementor and hook in to elementor/init
 */
if (defined('ELEMENTOR_VERSION')) {
    add_action('elementor/init', 'melodyInit');
} else {
    add_action('all_admin_notices', 'Melody\\Notices\\elementorVersionNotice');
}
