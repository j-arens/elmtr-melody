<?php

namespace Melody\Notices;

/**
 * print php incompatible admin notice
 */
function phpVersionNotice() {
    $p1 = __('elementor_melody requires a minimum PHP version of', MELODY_TD);
    $p2 = __('5.6', MELODY_TD);
    $p3 = __('Please contact your webhost to upgrade to a safe, modern version of PHP.', MELODY_TD);

    $html = '
        <div class="notice notice-error is-dismissible">
            <p>%1s <code>%2s</code> %3s</p>
        </div>
    ';

    printf($html, $p1, $p2, $p3);
}

/**
 * print wordpress incompatible admin notice
 */
function wpVersionNotice() {
    $p1 = __('elementor_melody requires a minimum WordPress version of', MELODY_TD);
    $p2 = __('4.7', MELODY_TD);
    $p3 = __('Click here', MELODY_TD);
    $p4 = __('to view instructions on updating WordPress.', MELODY_TD);

    $html = '
        <div class="notice notice-error is-dismissible">
            <p>
                %1s <code>%2s</code>.
                <a href="https://codex.wordpress.org/Updating_WordPress" target="_blank" rel="noopener noreferrer">
                    %3s
                </a>
                %4s
            </p>
        </div>
    ';

    printf($html, $p1, $p2, $p3, $p4);
}

/**
 * print elementor incompatible admin notice
 */
function elementorVersionNotice() {
    $p1 = __('elementor_melody requires a minimum Elementor version of', MELODY_TD);
    $p2 = __('1.9.3', MELODY_TD);
    $p3 = __('If you do not have Elementor installed there is a helpful guide', MELODY_TD);
    $p4 = __('here', MELODY_TD);
    $p5 = __('to get you started.', MELODY_TD);

    $html = '
        <div class="notice notice-error is-dismissible">
            %1s <code>%2s</code>. %3s
            <a href="https://docs.elementor.com/article/14-installation" target="_blank" rel="noopener noreferrer">
                %4s
            </a>
            %5s
        </div>
    ';

    printf($html, $p1, $p2, $p3, $p4, $p5);
}
