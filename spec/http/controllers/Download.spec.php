<?php

use Melody\Http\Request;
use Melody\Http\controllers\Download;
use function Melody\Test\Helpers\overrideMethodAccess;
use function Eloquent\Phony\Kahlan\stubGlobal;

describe('Download', function() {
    beforeEach(function() {
        $this->get_attached_file = stubGlobal('get_attached_file', 'Melody\Http\controllers');
        $this->get_post_mime_type = stubGlobal('get_post_mime_type', 'Melody\Http\controllers');
        $this->makeInstance = function($clientId = null, $attachmentId = null) {
            $_SERVER['REQUEST_METHOD'] = 'GET';
            if ($clientId) {
                $_GET['clientId'] = $clientId;
            }
            if ($attachmentId) {
                $_GET['attachment'] = $attachmentId;
            }
            $request = new Request;
            return new Download($request);
        };
    });

    afterEach(function() {
        $_GET = [];
    });

    describe('vaildateRequest()', function() {
        it('returns false if clientId is missing', function() {
            $instance = $this->makeInstance();
            $validateRequest = overrideMethodAccess($instance, 'validateRequest');
            expect($validateRequest())->toBe(false);
        });

        it('returns false if attachmentId is missing', function() {
            $instance = $this->makeInstance('123');
            $validateRequest = overrideMethodAccess($instance, 'validateRequest');
            expect($validateRequest())->toBe(false);
        });

        it('returns true if neccessary params are present', function() {
            $instance = $this->makeInstance('123', '456');
            $validateRequest = overrideMethodAccess($instance, 'validateRequest');
            expect($validateRequest())->toBe(true);
        });
    });

    describe('respond()', function() {
        it('bails if the request is not valid', function() {
            expect('http_response_code')->toBeCalled()->once()->with(403);
            $this->makeInstance();
        });

        it('bails if theres no attachment path', function() {
            expect('http_response_code')->toBeCalled()->once()->with(404);
            $this->makeInstance('123', '456');
        });
    });

    describe('streamFile()', function() {
        beforeEach(function() {
            $this->get_attached_file->returns('lol/path/to/file/cool-song.mp3');
            $this->get_post_mime_type->returns('audio/mp3');
        });

        it('flushes the buffer if needed', function() {
            ob_start();
            echo ' ';
            error_reporting(0);
            expect('ob_get_length')->toBeCalled()->once();
            expect('ob_end_flush')->toBeCalled()->once();
            $this->makeInstance('123', '456');
            error_reporting(E_ALL);
        });

        it('streams a file for download', function() {
            error_reporting(0);
            expect('header')->toBeCalled()->with('Content-Type: audio/mp3');
            expect('header')->toBeCalled()->with('Content-Disposition: attachment; filename="cool-song.mp3"');
            expect('readfile')->toBeCalled()->once()->with('lol/path/to/file/cool-song.mp3');
            $this->makeInstance('123', '456');
            error_reporting(E_ALL);
        });
    });
});
