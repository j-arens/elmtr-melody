<?php

use Elementor\Controls_Manager;

return [
    'version' => '1.0.0',
    'handle' => 'section_melody_tracks',
    'config' => [
        'label' => 'Audio Tracks',
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
                        'label' => 'Audio Source',
                        'type' => Controls_Manager::SELECT,
                        'label_block' => true,
                        'seperator' => true,
                        'default' => 'media-library',
                        'options' => [
                            'media-library' => 'Media Library',
                            'external-source' => 'External Source',
                            'rss-feed' => 'RSS Feed',
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
                        'label' => 'Track URL',
                        // 'type' => Controls_Manager::URL,
                        'type' => Controls_Manager::TEXT,
                        'input_type' => 'url',
                        'label_block' => true,
                        'condition' => [
                            'melody_audio_source' => 'external-source',
                        ],
                    ],
                    [
                        'name' => 'melody_track_title',
                        'label' => 'Title',
                        'type' => Controls_Manager::TEXT,
                        'label_block' => true,
                        'title' => 'Track Title',
                        'condition' => [
                            'melody_audio_source' => 'external-source',
                        ],
                    ],
                    [
                        'name' => 'melody_track_album',
                        'label' => 'Album',
                        'type' => Controls_Manager::TEXT,
                        'label_block' => true,
                        'condition' => [
                            'melody_audio_source' => 'external-source',
                        ],
                    ],
                    [
                        'name' => 'melody_track_artist',
                        'label' => 'Artist',
                        'type' => Controls_Manager::TEXT,
                        'label_block' => true,
                        'title' => 'Track Artist',
                        'condition' => [
                            'melody_audio_source' => 'external-source',
                        ],
                    ],
                    [
                        'name' => 'melody_track_artwork',
                        'label' => 'Artwork',
                        'type' => Controls_Manager::MEDIA,
                        'condition' => [
                            'melody_audio_source' => 'external-source',
                        ],
                    ],
                    [
                        'name' => 'melody_track_downloadable',
                        'label' => 'Enable Downloads',
                        'type' => Controls_Manager::SWITCHER,
                        'label_off' => 'off',
                        'label_on' => 'on',
                        'default' => 'off',
                    ],
                    [
                        'name' => 'melody_track_download_source',
                        'label' => 'Download URL',
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
                            Track #fixme
                        <# } #>
                    <# } else if (melody_audio_source === "media-library") { #>
                        <# if (melody_wp_media_picker.title) { #>
                            <# if (melody_wp_media_picker.artist) { #>
                                {{{ melody_wp_media_picker.title }}} - {{{ melody_wp_media_picker.artist }}}
                            <# } else { #>
                                {{{ melody_wp_media_picker.title }}}
                            <# } #>
                        <# } else { #>
                            Track #fixme
                        <# } #>
                    <# } else { #>
                        Track #fixme
                    <# } #>
                ',
            ],
        ],
    ],
];