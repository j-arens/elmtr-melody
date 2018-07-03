<?php

use Elementor\Controls_Manager;

return [
    'version' => '1.0.0',
    'handle' => 'section_melody_toolbar_tracks',
    'config' => [
        'label' => __('Audio Tracks', 'melody'),
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
                        'label' => __('Audio Source', 'melody'),
                        'type' => Controls_Manager::SELECT,
                        'label_block' => true,
                        'seperator' => true,
                        'default' => 'media-library',
                        'options' => [
                            'media-library' => __('Media Library', 'melody'),
                            'external-source' => __('External Source', 'melody'),
                        ],
                    ],
                    [
                        'name' => 'melody_track_id',
                        'label' => '',
                        'type' => Controls_Manager::HIDDEN,
                        'default' => '',
                    ],
                    [
                        'name' => 'melody_internal_track_url',
                        'label' => '',
                        'type' => Controls_Manager::HIDDEN,
                        'default' => '',
                    ],
                    [
                        'name' => 'melody_internal_track_duration',
                        'label' => '',
                        'type' => Controls_Manager::HIDDEN,
                        'default' => '',
                    ],
                    [
                        'name' => 'melody_track_picker_control',
                        'label' => '',
                        'type' => 'melody-track-picker',
                        'condition' => [
                            'melody_audio_source' => 'media-library',
                        ],
                    ],
                    [
                        'name' => 'melody_external_track_url',
                        'label' => __('Track URL', 'melody'),
                        'type' => Controls_Manager::TEXT,
                        'input_type' => 'url',
                        'label_block' => true,
                        'condition' => [
                            'melody_audio_source' => 'external-source',
                        ],
                    ],
                    [
                        'name' => 'melody_track_title',
                        'label' => __('Title', 'melody'),
                        'type' => Controls_Manager::TEXT,
                        'label_block' => true,
                        'title' => __('Track Title', 'melody'),
                    ],
                    [
                        'name' => 'melody_track_album',
                        'label' => __('Album', 'melody'),
                        'type' => Controls_Manager::TEXT,
                        'label_block' => true,
                    ],
                    [
                        'name' => 'melody_track_artist',
                        'label' => __('Artist', 'melody'),
                        'type' => Controls_Manager::TEXT,
                        'label_block' => true,
                        'title' => __('Track Artist', 'melody'),
                    ],
                    [
                        'name' => 'melody_track_downloadable',
                        'label' => __('Enable Downloads', 'melody'),
                        'type' => Controls_Manager::SWITCHER,
                        'label_off' => 'off',
                        'label_on' => 'on',
                        'default' => 'off',
                    ],
                    [
                        'name' => 'melody_track_download_source',
                        'label' => __('Download URL', 'melody'),
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
                    <# if (melody_track_title) { #>
                        <# if (melody_track_artist) { #>
                            {{{ melody_track_title }}} - {{{ melody_track_artist }}}
                        <# } else { #>
                            {{{ melody_track_title }}}
                        <# } #>
                    <# } else { #>
                        ' . __('Unnamed Track', 'melody') . '
                    <# } #>
                ',
            ],
        ],
    ],
];
