<?php

use Melody\Enhancers\EnhancesAudioAttachments;
use Kahlan\Plugin\Double;
use function Eloquent\Phony\Kahlan\stubGlobal;

describe('EnhancesAudioAttachments', function() {
    beforeEach(function() {
        $this->instance = new class { use EnhancesAudioAttachments; };
        $this->attachment = Double::instance(['class' => 'WP_Post']);
        $this->attachment->post_type = 'attachment';
        $this->attachment->post_mime_type = 'audio/mpeg';
        $this->get_post_thumbnail_id = stubGlobal('get_post_thumbnail_id', 'Melody\Enhancers');
    });

    describe('isAudioAttachment()', function() {
        it('returns false if the attachment is not a WP_Post', function() {
            $result = $this->instance->isAudioAttachment(new stdClass);
            expect($result)->toBe(false);
        });

        it('return false if the attachment post type is not attachment', function() {
            $this->attachment->post_type = 'rocinante';
            $result = $this->instance->isAudioAttachment($this->attachment);
            expect($result)->toBe(false);
        });

        it('return false if the attachment mime type is not audio', function() {
            $this->attachment->post_mime_type = 'image/jpeg';
            $result = $this->instance->isAudioAttachment($this->attachment);
            expect($result)->toBe(false);
        });
    });

    describe('addArtworkId()', function() {
        it('bails if the attachment is not an audio attachment', function() {
            $this->attachment->post_mime_type = 'image/jpeg';
            $result = $this->instance->addArtworkId([], $this->attachment);
            expect($result)->toBe([]);
        });

        it('adds the attachment thumbnail id to the response', function() {
            $this->get_post_thumbnail_id->returns(1);
            $result = $this->instance->addArtworkId([], $this->attachment);
            $expected = [
                'image' => [
                    'id' => 1,
                ],
            ];
            expect($result)->toBe($expected);
        });
    });
});
