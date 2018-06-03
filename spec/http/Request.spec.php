<?php

use Melody\Http\Request;

describe('Request', function() {
    beforeEach(function() {
        $_SERVER['REQUEST_METHOD'] = 'GET';
        $_GET['foo'] = 'bar';
        $this->instance = new Request;
    });

    describe('getParam()', function() {
        it('returns null if param doesnt exist', function() {
            $result = $this->instance->getParam('cascade-orange');
            expect($result)->toBe(null);
        });

        it('returns supplied default if param doesnt exist', function() {
            $result = $this->instance->getParam('magma-purple', 'silver-ice');
            expect($result)->toBe('silver-ice');
        });

        it('returns the param if it exists', function() {
            $result = $this->instance->getParam('foo');
            expect($result)->toBe('bar');
        });
    });

    describe('getMethod()', function() {
        it('returns the request method', function() {
            expect($this->instance->getMethod())->toBe('GET');
        });
    });
});
