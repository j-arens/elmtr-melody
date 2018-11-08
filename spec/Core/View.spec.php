<?php

use Melody\Core\View;

describe('View', function() {
    beforeEach(function() {
        $this->instance = new View;
    });

    describe('render()', function() {
        it('throws an error if the given template doesnt exist', function() {
            expect(function() {
                $this->instance->render('lol/rofl.php');
            })->toThrow(new InvalidArgumentException('Could not locate template at lol/rofl.php'));
        });

        it('echos the given template', function() {
            expect(function() {
                $this->instance->render('dev/kahlan/mocks/views/simple.php');
            })->toEcho('<div><p>hi!</p></div>');
        });

        it('extracts values for use in the template', function() {
            expect(function() {
                $value = 'foo';
                $this->instance->render('dev/kahlan/mocks/views/variable.php', [
                    'value' => $value,
                ]);
            })->toEcho('<div>foo</div>');
        });

        it('output buffers', function() {
            expect('ob_start')->toBeCalled();
            expect('ob_get_clean')->toBeCalled();
            $this->instance->render('dev/kahlan/mocks/views/ob.php');
        });
    });
});
