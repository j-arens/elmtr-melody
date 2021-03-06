<?php

namespace Melody\Enhancers;

trait EnhancesImageAttachments {
    /**
     * Add more image sizes for better responsive images
     */
    public function addImageSizes(array $sizes) {
        foreach($sizes as $name => $width) {
            add_image_size($name, $width, 9999);
        }
    }

    /**
     * Maps image sizes onto attachment meta
     * 
     * @param string $id
     * @param array $meta
     * @return array
     */
    public function mapSizes($id, array $meta) {
        if (!isset($meta['sizes'])) {
            return [];
        }
        return array_map(function($size) use($id, $meta) {
            $uri = wp_get_attachment_image_src($id, $size)[0];
            return array_merge(
                $meta['sizes'][$size],
                [
                    'uri' => $uri,
                    'size' => $size,
                ]
            );
        }, array_keys($meta['sizes']));
    }
    
    /**
     * Adds sizes to melody track artwork data
     * 
     * @param array $data
     * @return array
     */
    public function addAttachmentSizes(array $data) {
        if (!isset($data['settings']['melody_audio_tracks'])) {
            return $data;
        }

        foreach($data['settings']['melody_audio_tracks'] as $i => $track) {
            $id = $track['melody_track_artwork']['id'];

            if (!$id) {
                return $data;
            }

            $meta = wp_get_attachment_metadata($id);

            $track['melody_track_artwork']['sizes'] = $this->mapSizes($id, $meta);
            $track['melody_track_artwork']['sizes'][] = [
                'file' => $meta['file'],
                'uri' => wp_get_attachment_image_src($id, 'full')[0],
                'width' => $meta['width'],
                'height' => $meta['height'],
                'mime-type' => 'image/' . substr(strrchr($meta['file'], '.'), 1),
                'size' => 'full',
            ];

            $data['settings']['melody_audio_tracks'][$i] = $track;
        }

        return $data;
    }
}
