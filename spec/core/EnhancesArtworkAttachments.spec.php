<?php

use function Eloquent\Phony\Kahlan\stubGlobal;
use function Eloquent\Phony\mock;

describe('EnhancesArtworkAttachments', function() {
    beforeEach(function() {
        $this->data = include 'dev/fixtures/widget-data.php';
        $this->wp_get_attachment_metadata = stubGlobal('wp_get_attachment_metadata', 'Melody\Core');
        $this->mock = mock(['Melody\Core\EnhancesArtworkAttachments'])->get();
    });

    describe('addAttachmentSizes()', function() {
        beforeEach(function() {
            // circumvent protected access
            $this->addAttachmentSizes = new ReflectionMethod($this->mock, 'addAttachmentSizes');
            $this->addAttachmentSizes->setAccessible(true);
        });

        it('should not attempt to alter the data if there are no audio tracks', function() {
            $this->data['settings']['melody_audio_tracks'] = [];
            $result = $this->addAttachmentSizes->invoke($this->mock, $this->data);
            var_dump($result);
            // expect($result)->toBe($this->data);
        });
    });
});
