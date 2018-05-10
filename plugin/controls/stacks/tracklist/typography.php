<?php

use Elementor\Controls_Manager;
use Elementor\Group_Control_Typography;
use Elementor\Group_Control_Text_Shadow;
use Elementor\Scheme_Typography;

return [
    'version' => '1.0.0',
    'handle' => 'section_melody_tracklist_typography',
    'config' => [
        'label' => __('Typography', MELODY_TD),
        'tab' => Controls_Manager::TAB_STYLE,
    ],
    'inputs' => [
        [
            'handle' => 'section_melody_tracklist_typography_title_artist',
            'config' => [
                'type' => Controls_Manager::HEADING,
                'label' => __('Track Title & Artist', MELODY_TD),
            ],
        ],
        [
            'isGroup' => true,
            'handle' => Group_Control_Typography::get_type(),
            'config' => [
                'name' => 'melody_tracklist_title',
                'label' => __('Font Style', MELODY_TD),
                'selector' => '{{WRAPPER}} [data-melody-title], {{WRAPPER}} [data-melody-artist]',
            ],
        ],
        [
            'isGroup' => true,
            'handle' => Group_Control_Text_Shadow::get_type(),
            'config' => [
                'name' => 'melody_tracklist_title_text_shadow',
                'label' => __('Shadow', MELODY_TD),
                'selector' => '{{WRAPPER}} [data-melody-title], {{WRAPPER}} [data-melody-artist]',
                // 'separator' => 'none', no separator options exposed for text shadow group control
            ],
        ],
        [
            'handle' => 'melody_tracklist_title_color',
            'config' => [
                'label' => __('Color', MELODY_TD),
                'type' => Controls_Manager::COLOR,
                'default' => '#fff',
                'separator' => 'none',
                'selectors' => [
                    '{{WRAPPER}} [data-melody-title], {{WRAPPER}} [data-melody-artist]' => 'color: {{VALUE}}',
                ],
            ],
        ],
        // [
        //     'handle' => 'section_melody_toolbar_typography_time',
        //     'config' => [
        //         'type' => Controls_Manager::HEADING,
        //         'label' => __('Time', MELODY_TD),
        //     ],
        // ],
        // [
        //     'isGroup' => true,
        //     'handle' => Group_Control_Typography::get_type(),
        //     'config' => [
        //         'name' => 'melody_toolbar_time',
        //         'label' => __('Font Style', MELODY_TD),
        //         'selector' => '{{WRAPPER}} [data-melody-time]',
        //     ],
        // ],
        // [
        //     'isGroup' => true,
        //     'handle' => Group_Control_Text_Shadow::get_type(),
        //     'config' => [
        //         'name' => 'melody_toolbar_time_text_shadow',
        //         'label' => __('Shadow', MELODY_TD),
        //         'selector' => '{{WRAPPER}} [data-melody-time]',
        //         // 'separator' => 'none', no separator options exposed for text shadow group control
        //     ],
        // ],
        // [
        //     'handle' => 'melody_toolbar_time_color',
        //     'config' => [
        //         'label' => __('Color', MELODY_TD),
        //         'type' => Controls_Manager::COLOR,
        //         'default' => '#fff',
        //         'separator' => 'none',
        //         'selectors' => [
        //             '{{WRAPPER}} [data-melody-time]' => 'color: {{VALUE}}',
        //         ],
        //     ],
        // ],
        [
            'handle' => 'section_melody_tracklist_track_typography_title_separator',
            'config' => [
                'type' => Controls_Manager::HEADING,
                'label' => __('Separator', MELODY_TD),
            ],
        ],
        [
            'handle' => 'section_melody_tracklist_track_separator_text',
            'config' => [
                'type' => Controls_Manager::TEXT,
                'label' => __('Text', MELODY_TD),
                'default' => '-',
                'placeholder' => '-',
                'label_block' => true,
                'selectors' => [
                    '{{WRAPPER}} .melody-tracklist__track .melody-c-separator::after' => 'content: "{{VALUE}}"',
                ],
            ],
        ],
        [
            'isGroup' => true,
            'handle' => Group_Control_Typography::get_type(),
            'config' => [
                'name' => 'melody_tracklist_track_separator_font',
                'label' => __('Font Style', MELODY_TD),
                'selector' => '{{WRAPPER}} .melody-tracklist__track .melody-c-separator::after',
            ],
        ],
        [
            'handle' => 'melody_tracklist__track_separator_color',
            'config' => [
                'label' => __('Color', MELODY_TD),
                'type' => Controls_Manager::COLOR,
                'default' => '#fff',
                'separator' => 'none',
                'selectors' => [
                    '{{WRAPPER}} .melody-tracklist__track .melody-c-separator::after' => 'color: {{VALUE}}',
                ],
            ],
        ],
        [
            'handle' => 'melody_tracklist_track_separator_spacing',
            'config' => [
                'label' => __('Spacing', MELODY_TD),
                'type' => Controls_Manager::SLIDER,
                'default' => [
                    'size' => 4,
                    'unit' => 'px',
                ],
                'size_units' => ['px', 'em', '%'],
                'range' => [
                    'px' => [
                        'min' => 0,
                        'step' => 1,
                    ],
                    'em' => [
                        'min' => 0,
                        'step' => 1,
                    ],
                    '%' => [
                        'min' => 0,
                        'step' => 1,
                    ],
                ],
                'selectors' => [
                    '{{WRAPPER}} .melody-tracklist__track .melody-c-separator' => 'margin: 0 {{SIZE}}{{UNIT}};', 
                ],
            ],
        ],
    ],
];
