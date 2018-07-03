<?php

use Melody\Notices;

describe('notices', function() {
    describe('phpVersionNotice()', function() {
        it('prints a notice', function() {
            $expected = '<div class="notice notice-error is-dismissible"><p>Melody requires a minimum PHP version of <code>5.6</code> Please contact your webhost to upgrade to a safe, modern version of PHP.</p></div>';
            expect('Melody\\Notices\\phpVersionNotice')->toEcho($expected);
        });
    });

    describe('wpVersionNotice()', function() {
        it('prints a notice', function() {
            $expected = '<div class="notice notice-error is-dismissible"><p>Melody requires a minimum WordPress version of <code>4.7</code>. <a href="https://codex.wordpress.org/Updating_WordPress" target="_blank" rel="noopener noreferrer">Click here</a> to view instructions on updating WordPress.</p></div>';
            expect('Melody\\Notices\\wpVersionNotice')->toEcho($expected);
        });
    });

    describe('elementorVersionNotice()', function() {
        it('prints a notice', function() {
            $expected = '<div class="notice notice-error is-dismissible"><p>Melody requires a minimum Elementor version of <code>1.9.3</code>. If you do not have Elementor installed there is a helpful guide <a href="https://docs.elementor.com/article/14-installation" target="_blank" rel="noopener noreferrer">here</a> to get you started.</p></div>';
            expect('Melody\\Notices\\elementorVersionNotice')->toEcho($expected);
        });
    });
});
