<?php

namespace Melody\Enhancers;

trait EnhancesAudioAttachments {
    /**
     * Checks if the given attachment is an audio post
     * 
     * @param mixed $attachment
     * @return boolean
     */
    public function isAudioAttachment($attachment) {
        if (!$attachment instanceof \WP_Post) {
            return false;
        }

        if ($attachment->post_type !== 'attachment') {
            return false;
        }

        if (substr($attachment->post_mime_type, 0, 5) !== 'audio') {
            return false;
        }

        return true;
    }

    /**
     * Enhances async audio uploads with the attached featured image id
     * 
     * @param array $res
     * @param mixed $attachment
     * @return array
     */
    public function addArtworkId(array $res, $attachment) {
        if (!$this->isAudioAttachment($attachment)) {
            return $res;
        }

        $res['image']['id'] = get_post_thumbnail_id($attachment);
        return $res;
    }
}
