<?php

/*
Plugin Name: Elementor-Melody
Plugin URI: 
Description:
Version: 0.1.0
Author: Josh Arens
Author URI: jarens.me
License: GPL-2.0
*/

define('MELODY_VERSION', '0.1.0');
define('MELODY_ROOT', __FILE__);
define('MELODY_BASE_DIR', __DIR__);
define('MELODY_PLUGIN_DIR', __DIR__ . '/plugin');

add_action('elementor/init', 'melody_init');

/**
 * Entry points
 */
function melody_init() {
    if (!melody_compatible()) {   
        return;
    }

    require MELODY_PLUGIN_DIR . '/bootstrap.php';
}

/**
 * Pre-flight checks before booting plugin
 * 
 * @return boolean
 */
function melody_compatible() {
    if (version_compare(PHP_VERSION, '5.4', '<')) { // @TODO: figure out min ver
        add_action('all_admin_notices', 'melody_php_fail');
        return;
    }

    if (version_compare(get_bloginfo('version'), '4.7', '<')) { // @TODO: test compat wp
        add_action('all_admin_notices', 'melody_wp_fail');
        return;
    }

    if (defined('ELEMENTOR_VERSION') && version_compare(ELEMENTOR_VERSION, '1.9.3', '<')) { // @TODO: test elementor versions
        add_action('all_admin_notices', 'melody_elmtr_fail');
        return;
    }

    return true;
}

/**
 * print php incompatible admin notice
 */
function melody_php_fail() {
    echo '
        <div class="notice notice-error is-dismissible">
            <p>
                elementor_melody requires a minimum PHP version of <code>5.6</code>.
                Please contact your webhost to upgrade to a safe, modern version of PHP.
            </p>
        </div>
    ';
}

/**
 * print wordpress incompatible admin notice
 */
function melody_wp_fail() {
    echo '
        <div class="notice notice-error is-dismissible">
            <p>
                elementor_melody requires a minimum WordPress version of <code>4.7</code>.
                <a href="https://codex.wordpress.org/Updating_WordPress" target="_blank" rel="noopener noreferrer">
                    Click here
                </a> 
                to view instructions on updating WordPress.
            </p>
        </div>
    ';
}

/**
 * print elementor incompatible admin notice
 */
function melody_elmtr_fail() {
    echo '
        <div class="notice notice-error is-dismissible">
            <p>
                elementor_melody requires a minimum Elementor version of <code>1.9.3</code>.
                If you do not have Elementor installed there is a helpful guide
                <a href="https://docs.elementor.com/article/14-installation" target="_blank" rel="noopener noreferrer">
                    here
                </a>
                to get you started.
            </p>
        </div>
    ';
}
