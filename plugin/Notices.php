<?php

namespace Melody;

use Melody\Core\View;

class Notices {
    /**
     * Renders the admin notice template with the provided message
     *
     * @param string $message
     */
    public static function renderNotice($message) {
        (new View())->render(
            MELODY_PLUGIN_DIR . '/templates/admin-notice.php',
            compact('message')
        );
    }

    /**
     * print php incompatible admin notice
     */
    public static function phpVersionNotice() {
        self::renderNotice(sprintf(
            __('Melody requires a minimum PHP version of %1s. Please contact your webhost to upgrade to a safe, modern version of PHP.', 'melody'),
            '5.6'
        ));
    }

    /**
     * print wordpress incompatible admin notice
     */
    public static function wpVersionNotice() {
        self::renderNotice(sprintf(
            __('Melody requires a minimum WordPress version of %1s. <a href="%2s" target="_blank" rel="noopener noreferrer">Click here</a> to view instructions on updating WordPress.', 'melody'),
            '4.7', 'https://codex.wordpress.org/Updating_WordPress'
        ));
    }

    /**
     * print elementor incompatible admin notice
     */
    public static function elementorVersionNotice() {
        self::renderNotice(sprintf(
            __('Melody requires a minimum Elementor version of %1s. If you do not have Elementor installed there is a helpful guide <a href="%2s" target="_blank" rel="noopener noreferrer">here</a> to get you started.', 'melody'),
            '2.1.0', 'https://docs.elementor.com/article/14-installation'
        ));
    }
}
