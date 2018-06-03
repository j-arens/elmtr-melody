<?php

use Melody\Controls\custom\TrackPicker;
use Melody\Core\View;
use Kahlan\Plugin\Double;
use function Melody\Test\Helpers\overrideMethodAccess;
use function Eloquent\Phony\Kahlan\stubGlobal;

describe('TrackPicker', function() {
    beforeEach(function() {
        $view = new View;
        $this->instance = new TrackPicker($view);
        $this->attachment = Double::instance(['class' => 'WP_Post']);
        $this->attachment->post_type = 'attachment';
        $this->attachment->post_mime_type = 'audio/mpeg';
        $this->get_post_thumbnail_id = stubGlobal('get_post_thumbnail_id', 'Melody\Controls\custom');
    });

    describe('isAudioAttachment()', function() {
        beforeEach(function() {
            $this->isAudioAttachment = overrideMethodAccess($this->instance, 'isAudioAttachment');
        });

        it('returns false if the attachment is not a WP_Post', function() {
            $result = $this->isAudioAttachment(new stdClass);
            expect($result)->toBe(false);
        });

        it('return false if the attachment post type is not attachment', function() {
            $this->attachment->post_type = 'rocinante';
            $result = $this->isAudioAttachment($this->attachment);
            expect($result)->toBe(false);
        });

        it('return false if the attachment mime type is not audio', function() {
            $this->attachment->post_mime_type = 'image/jpeg';
            $result = $this->isAudioAttachment($this->attachment);
            expect($result)->toBe(false);
        });
    });

    describe('enhanceAsyncAudioUpload()', function() {
        beforeEach(function() {
            $this->enhanceAsyncAudioUpload = overrideMethodAccess($this->instance, 'enhanceAsyncAudioUpload');
        });

        it('bails if the attachment is not an audio attachment', function() {
            $this->attachment->post_mime_type = 'image/jpeg';
            $result = $this->enhanceAsyncAudioUpload([], $this->attachment);
            expect($result)->toBe([]);
        });

        it('adds the attachment thumbnail id to the response', function() {
            $this->get_post_thumbnail_id->returns(1);
            $result = $this->enhanceAsyncAudioUpload([], $this->attachment);
            $expected = [
                'image' => [
                    'id' => 1,
                ],
            ];
            expect($result)->toBe($expected);
        });
    });
});
