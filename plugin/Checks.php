<?php

namespace Melody;

class Checks {
    /**
     * @var string
     */
    const MIN_PHP = '5.6';

    /**
     * @var string
     */
    const MIN_WP = '4.7';

    /**
     * @var string
     */
    const MIN_ELEMENTOR = '2.1.0';

    /**
     * PHP version check
     *
     * @return boolean
     */
    public static function phpCheck() {
        if (version_compare(PHP_VERSION, self::MIN_PHP, '<')) {
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
        if (version_compare(get_bloginfo('version'), self::MIN_WP, '<')) {
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
        if (!defined('ELEMENTOR_VERSION')) {
            return false;
        }
        if (version_compare(ELEMENTOR_VERSION, self::MIN_ELEMENTOR, '<')) {
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
