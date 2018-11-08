<?php

use Melody\Core\functions;

describe('functions', function() {
    describe('collect()', function() {
        it('should return an empty array if the given dir doesnt exist', function() {
            $result = functions\collect(MELODY_PLUGIN_DIR . '/lol/rofl/');
            expect($result)->toBeA('array');
            expect(empty($result))->toBe(true);
        });
    
        it('should return an array with the result of the included files', function() {
            $result = functions\collect('./dev/kahlan/mocks/mock-collect-dir/');
            $values = array_values($result);
            expect($result)->toBeA('array');
            expect($values[0])->toBe('1');
            expect($values[1])->toBe('2');
        });
    
        it('shouldnt try to include folders', function() {
            $result = functions\collect('./dev/kahlan/mocks/mock-collect-dir/');
            $values = array_values($result);
            expect(in_array('dont collect me', $values))->toBe(false);
        });
    });
});
