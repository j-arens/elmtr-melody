<?php

use Melody\Notices;

describe('notices', function() {
    beforeEach(function() {
        $this->markup = function($text) {
            $notice = '<div class="notice notice-error is-dismissible">';
            $notice .= "\n    ";
            $notice .= "<p>$text</p>";
            $notice .= "\n</div>";
            return $notice;
        };
    });

    describe('phpVersionNotice', function() {
        it('prints a notice', function() {
            $expected = $this->markup('Melody requires a minimum PHP version of 5.6. Please contact your webhost to upgrade to a safe, modern version of PHP.');
            expect('Melody\Notices::phpVersionNotice')->toEcho($expected);
        });
    });

    describe('wpVersionNotice', function() {
        it('prints a notice', function() {
            $expected = $this->markup('Melody requires a minimum WordPress version of 4.7. <a href="https://codex.wordpress.org/Updating_WordPress" target="_blank" rel="noopener noreferrer">Click here</a> to view instructions on updating WordPress.');
            expect('Melody\Notices::wpVersionNotice')->toEcho($expected);
        });
    });

    describe('elementorVersionNotice', function() {
        it('prints a notice', function() {
            $expected = $this->markup('Melody requires a minimum Elementor version of 2.1.0. If you do not have Elementor installed there is a helpful guide <a href="https://docs.elementor.com/article/14-installation" target="_blank" rel="noopener noreferrer">here</a> to get you started.');
            expect('Melody\Notices::elementorVersionNotice')->toEcho($expected);
        });
    });
});
