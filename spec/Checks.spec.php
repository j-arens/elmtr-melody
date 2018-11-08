<?php

use Melody\Checks;
use function Eloquent\Phony\Kahlan\stubGlobal;

describe('checks', function() {
    beforeEach(function() {
        $this->version_compare = stubGlobal('version_compare', 'Melody');
        $this->add_action = stubGlobal('add_action', 'Melody');
        $this->get_bloginfo = stubGlobal('get_bloginfo', 'Melody');
    });

    describe('phpCheck', function() {
        it('fails if php version is incompatible', function() {
            $this->version_compare->returns(true);
            $result = Checks::phpCheck();
            expect($result)->toBe(false);
            $this->add_action->calledWith('all_admin_notices', 'Melody\Notices::phpVersionNotice');
        });
    });

    describe('wpCheck', function() {
        it('fails if wp version is incompatible', function() {
            $this->version_compare->returns(true);
            $this->get_bloginfo->returns('1');
            $result = Checks::wpCheck();
            expect($result)->toBe(false);
            $this->add_action->calledWith('all_admin_notices', 'Melody\Notices::wpVersionNotice');
        });
    });

    describe('elementorCheck', function() {
        it('fails if elementor version is incompatible', function() {
            define('ELEMENTOR_VERSION', '1');
            $this->version_compare->returns(true);
            $result = Checks::elementorCheck();
            expect($result)->toBe(false);
            $this->add_action->calledWith('all_admin_notices', 'Melody\Notices::elementorVersionNotice');
        });
    });

    describe('passesChecks', function() {
        it('runs all of the checks', function() {
            $instance = new Checks;
            expect($instance)->toReceive('::phpCheck');
            expect($instance)->toReceive('::wpCheck');
            expect($instance)->toReceive('::elementorCheck');
            $instance::passesChecks();
        });
    });
});
