<?php

use Melody\Enhancers\EnhancesImageAttachments;
use function Eloquent\Phony\Kahlan\stubGlobal;

describe('EnhancesImageAttachments', function() {
    beforeEach(function() {
        $this->data = include 'dev/fixtures/widget-data.php';
        $this->meta = include 'dev/fixtures/attachment-meta.php';
        $this->prepared = include 'dev/fixtures/prepared-track.php';
        $this->wp_get_attachment_metadata = stubGlobal('wp_get_attachment_metadata', 'Melody\Enhancers');
        $this->wp_get_attachment_image_src = stubGlobal('wp_get_attachment_image_src', 'Melody\Enhancers');
        $this->instance = new class { use EnhancesImageAttachments; };
    });

    describe('mapSizes()', function() {
        it('maps attachment meta sizes to track artwork sizes', function() {
            $this->wp_get_attachment_image_src->returns(
                ['//localhost:4001/wp-content/uploads/2018/06/WAX-TAILOR-Masquerade-Theme-skit-mp3-image-150x150.jpg'],
                ['//localhost:4001/wp-content/uploads/2018/06/WAX-TAILOR-Masquerade-Theme-skit-mp3-image-300x300.jpg'],
                ['//localhost:4001/wp-content/uploads/2018/06/WAX-TAILOR-Masquerade-Theme-skit-mp3-image-100x100.jpg'],
                ['//localhost:4001/wp-content/uploads/2018/06/WAX-TAILOR-Masquerade-Theme-skit-mp3-image-320x319.jpg'],
                ['//localhost:4001/wp-content/uploads/2018/06/WAX-TAILOR-Masquerade-Theme-skit-mp3-image-480x478.jpg']
            );
            $result = $this->instance->mapSizes('120', $this->meta);
            $expected = array_slice($this->prepared['melody_track_artwork']['sizes'], 0, 5);
            expect($result)->toHaveLength(5);
            expect($result)->toEqual($expected);
        });
    });

    describe('addAttachmentSizes()', function() {
        it('should not alter the data if there are no audio tracks', function() {
            $data = $this->data;
            $data['settings']['melody_audio_tracks'] = [];
            $result = $this->instance->addAttachmentSizes($data);
            expect($result)->toEqual($data);
        });

        it('adds artwork attachment sizes to an audio track', function() {
            $this->wp_get_attachment_metadata->returns($this->meta);
            $this->wp_get_attachment_image_src->returns(
                ['//localhost:4001/wp-content/uploads/2018/06/WAX-TAILOR-Masquerade-Theme-skit-mp3-image-150x150.jpg'],
                ['//localhost:4001/wp-content/uploads/2018/06/WAX-TAILOR-Masquerade-Theme-skit-mp3-image-300x300.jpg'],
                ['//localhost:4001/wp-content/uploads/2018/06/WAX-TAILOR-Masquerade-Theme-skit-mp3-image-100x100.jpg'],
                ['//localhost:4001/wp-content/uploads/2018/06/WAX-TAILOR-Masquerade-Theme-skit-mp3-image-320x319.jpg'],
                ['//localhost:4001/wp-content/uploads/2018/06/WAX-TAILOR-Masquerade-Theme-skit-mp3-image-480x478.jpg'],
                ['//localhost:4001/wp-content/uploads/2018/06/WAX-TAILOR-Masquerade-Theme-skit-mp3-image.jpg']
            );
            $result = $this->instance->addAttachmentSizes($this->data);
            $track = $result['settings']['melody_audio_tracks'][0];
            $expected = $this->prepared['melody_track_artwork']['sizes'];
            expect(isset($track['melody_track_artwork']['sizes']))->toBe(true);
            expect($track['melody_track_artwork']['sizes'])->toHaveLength(6);
            expect($track['melody_track_artwork']['sizes'])->toEqual($expected);
        });
    });
});
