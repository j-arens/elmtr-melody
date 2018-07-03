<?php

namespace Melody\Notices;

/**
 * print php incompatible admin notice
 */
function phpVersionNotice() {
    $p1 = __('Melody requires a minimum PHP version of', 'melody');
    $p2 = __('5.6', 'melody');
    $p3 = __('Please contact your webhost to upgrade to a safe, modern version of PHP.', 'melody');
    $html = '<div class="notice notice-error is-dismissible">';
    $html .= '<p>%1s <code>%2s</code> %3s</p>';
    $html .= '</div>';
    printf($html, $p1, $p2, $p3);
}

/**
 * print wordpress incompatible admin notice
 */
function wpVersionNotice() {
    $p1 = __('Melody requires a minimum WordPress version of', 'melody');
    $p2 = __('4.7', 'melody');
    $p3 = __('Click here', 'melody');
    $p4 = __('to view instructions on updating WordPress.', 'melody');
    $html = '<div class="notice notice-error is-dismissible">';
    $html .= '<p>%1s <code>%2s</code>.';
    $html .= ' <a href="https://codex.wordpress.org/Updating_WordPress" target="_blank" rel="noopener noreferrer">%3s</a> ';
    $html .= '%4s</p>';
    $html .= '</div>';
    printf($html, $p1, $p2, $p3, $p4);
}

/**
 * print elementor incompatible admin notice
 */
function elementorVersionNotice() {
    $p1 = __('Melody requires a minimum Elementor version of', 'melody');
    $p2 = __('1.9.3', 'melody');
    $p3 = __('If you do not have Elementor installed there is a helpful guide', 'melody');
    $p4 = __('here', 'melody');
    $p5 = __('to get you started.', 'melody');
    $html = '<div class="notice notice-error is-dismissible">';
    $html .= '<p>%1s <code>%2s</code>. %3s';
    $html .= ' <a href="https://docs.elementor.com/article/14-installation" target="_blank" rel="noopener noreferrer">%4s</a> ';
    $html .= '%5s</p>';
    $html .= '</div>';
    printf($html, $p1, $p2, $p3, $p4, $p5);
}
