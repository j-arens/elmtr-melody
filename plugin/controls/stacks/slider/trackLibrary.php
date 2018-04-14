<?php

use Elementor\Controls_Manager;

return [
    'version' => '1.0.0',
    'handle' => 'section_melody_tracks',
    'config' => [
        'label' => __('Audio Tracks', MELODY_TD),
    ],
    'inputs' => [
        [
            'handle' => 'melody_audio_tracks',
            'config' => [
                'label' => '',
                'type' => Controls_Manager::REPEATER,
                'prevent_empty' => false,
                'fields' => [
                    [
                        'name' => 'melody_audio_source',
                        'label' => __('Audio Source', MELODY_TD),
                        'type' => Controls_Manager::SELECT,
                        'label_block' => true,
                        'seperator' => true,
                        'default' => 'media-library',
                        'options' => [
                            'media-library' => __('Media Library', MELODY_TD),
                            'external-source' => __('External Source', MELODY_TD),
                        ],
                    ],
                    [
                        'name' => 'melody_wp_media_picker',
                        'label' => '',
                        'type' => 'melody-audio-picker',
                        'condition' => [
                            'melody_audio_source' => 'media-library',
                        ],
                    ],
                    [
                        'name' => 'melody_track_url',
                        'label' => __('Track URL', MELODY_TD),
                        'type' => Controls_Manager::TEXT,
                        'input_type' => 'url',
                        'label_block' => true,
                        'condition' => [
                            'melody_audio_source' => 'external-source',
                        ],
                    ],
                    [
                        'name' => 'melody_track_title',
                        'label' => __('Title', MELODY_TD),
                        'type' => Controls_Manager::TEXT,
                        'label_block' => true,
                        'title' => __('Track Title', MELODY_TD),
                        'condition' => [
                            'melody_audio_source' => 'external-source',
                        ],
                    ],
                    [
                        'name' => 'melody_track_album',
                        'label' => __('Album', MELODY_TD),
                        'type' => Controls_Manager::TEXT,
                        'label_block' => true,
                        'condition' => [
                            'melody_audio_source' => 'external-source',
                        ],
                    ],
                    [
                        'name' => 'melody_track_artist',
                        'label' => __('Artist', MELODY_TD),
                        'type' => Controls_Manager::TEXT,
                        'label_block' => true,
                        'title' => __('Track Artist', MELODY_TD),
                        'condition' => [
                            'melody_audio_source' => 'external-source',
                        ],
                    ],
                    [
                        'name' => 'melody_track_artwork',
                        'label' => __('Artwork', MELODY_TD),
                        'type' => Controls_Manager::MEDIA,
                        'condition' => [
                            'melody_audio_source' => 'external-source',
                        ],
                    ],
                    [
                        'name' => 'melody_track_downloadable',
                        'label' => __('Enable Downloads', MELODY_TD),
                        'type' => Controls_Manager::SWITCHER,
                        'label_off' => 'off',
                        'label_on' => 'on',
                        'default' => 'off',
                    ],
                    [
                        'name' => 'melody_track_download_source',
                        'label' => __('Download URL', MELODY_TD),
                        'type' => Controls_Manager::TEXT,
                        'input_type' => 'url',
                        'label_block' => true,
                        'condition' => [
                            'melody_audio_source' => 'external-source',
                            'melody_track_downloadable' => 'yes',
                        ],
                    ],
                ],
                'title_field' => '
                    <# if (melody_audio_source === "external-source") { #>
                        <# if (melody_track_title) { #>
                            <# if (melody_track_artist) { #>
                                {{{ melody_track_title }}} - {{{ melody_track_artist }}}
                            <# } else { #>
                                {{{ melody_track_title }}}
                            <# } #>
                        <# } else { #>
                            ' . __('Unnamed Track', MELODY_TD) . '
                        <# } #>
                    <# } else if (melody_audio_source === "media-library") { #>
                        <# if (melody_wp_media_picker.title) { #>
                            <# if (melody_wp_media_picker.artist) { #>
                                {{{ melody_wp_media_picker.title }}} - {{{ melody_wp_media_picker.artist }}}
                            <# } else { #>
                                {{{ melody_wp_media_picker.title }}}
                            <# } #>
                        <# } else { #>
                            ' . __('Unnamed Track', MELODY_TD) . '
                        <# } #>
                    <# } else { #>
                        ' . __('Unnamed Track', MELODY_TD) . '
                    <# } #>
                ',
            ],
        ],
    ],
];
