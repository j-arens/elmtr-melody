<?php

namespace Melody;

class Checks {
    /**
     * PHP version check
     *
     * @return boolean
     */
    public static function phpCheck() {
        $min = '5.6';
        if (version_compare(PHP_VERSION, $min, '<')) {
            add_action('all_admin_notices', 'Melody\\Notices::phpVersionNotice');
            return false;
        }
        return true;
    }

    /**
     * WP version check
     *
     * @return boolean
     */
    public static function wpCheck() {
        $min = '4.7';
        if (version_compare(get_bloginfo('version'), $min, '<')) {
            add_action('all_admin_notices', 'Melody\\Notices::wpVersionNotice');
            return false;
        }
        return true;
    }

    /**
     * Elementor version check
     *
     * @return boolean
     */
    public static function elementorCheck() {
        $min = '2.1.0';
        if (!defined('ELEMENTOR_VERSION')) {
            return false;
        }
        if (version_compare(ELEMENTOR_VERSION, $min, '<')) {
            add_action('all_admin_notices', 'Melody\\Notices::elementorVersionNotice');
            return false;
        }
        return true;
    }

    /**
     * Runs pre-flight checks
     *
     * @return boolean
     */
    public static function passesChecks() {
        $passes = true;
        $checks = [
            'phpCheck',
            'wpCheck',
            'elementorCheck',
        ];
        foreach ($checks as $check) {
            $result = call_user_func(__NAMESPACE__ . "\Checks::$check");
            if (!$result) {
                $passes = false;
            }
        }
        return $passes;
    }
}
