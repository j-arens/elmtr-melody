<?php

use Elementor\Controls_Manager;
use Elementor\Group_Control_Typography;
use Elementor\Group_Control_Text_Shadow;
use Elementor\Scheme_Typography;

return [
    'version' => '1.0.0',
    'handle' => 'section_melody_typography',
    'config' => [
        'label' => __('Typography', 'melody'),
        'tab' => Controls_Manager::TAB_STYLE,
    ],
    'inputs' => [
        [
            'handle' => 'section_melody_typography_title',
            'config' => [
                'type' => Controls_Manager::HEADING,
                'label' => __('Track Title', 'melody'),
            ],
        ],
        [
            'isGroup' => true,
            'handle' => Group_Control_Typography::get_type(),
            'config' => [
                'name' => 'melody_title!melody-top-separator',
                'label' => __('Font Style', 'melody'),
                'separator' => 'none', // elementor bug - separators don't work on group controls
                'selector' => '{{WRAPPER}} .melody-c-title-font',
            ],
        ],
        [
            'isGroup' => true,
            'handle' => Group_Control_Text_Shadow::get_type(),
            'config' => [
                'name' => 'melody_title_text_shadow',
                'label' => __('Shadow', 'melody'),
                'selector' => '{{WRAPPER}} .melody-c-title-shadow',
            ],
        ],
        [
            'handle' => 'melody_title_color',
            'config' => [
                'label' => __('Color', 'melody'),
                'type' => Controls_Manager::COLOR,
                'default' => '#fff',
                'separator' => 'none',
                'selectors' => [
                    '{{WRAPPER}} .melody-c-title-color' => 'color: {{VALUE}}',
                ],
            ],
        ],
        [
            'handle' => 'section_melody_typography_artist',
            'config' => [
                'type' => Controls_Manager::HEADING,
                'label' => __('Artist', 'melody'),
                'separator' => 'before',
            ],
        ],
        [
            'isGroup' => true,
            'handle' => Group_Control_Typography::get_type(),
            'config' => [
                'name' => 'melody_artist!melody-top-separator',
                'label' => __('Font Style', 'melody'),
                'separator' => 'none', // elementor bug - separators don't work on group controls
                'selector' => '{{WRAPPER}} .melody-c-artist-font',
            ],
        ],
        [
            'isGroup' => true,
            'handle' => Group_Control_Text_Shadow::get_type(),
            'config' => [
                'name' => 'melody_artist_text_shadow',
                'label' => __('Shadow', 'melody'),
                'selector' => '{{WRAPPER}} .melody-c-artist-shadow',
            ],
        ],
        [
            'handle' => 'melody_artist_color',
            'config' => [
                'label' => __('Color', 'melody'),
                'type' => Controls_Manager::COLOR,
                'default' => '#fff',
                'separator' => 'none',
                'selectors' => [
                    '{{WRAPPER}} .melody-c-artist-color' => 'color: {{VALUE}}',
                ],
            ],
        ],
        [
            'handle' => 'section_melody_typography_time',
            'config' => [
                'type' => Controls_Manager::HEADING,
                'label' => __('Time', 'melody'),
                'separator' => 'before',
            ],
        ],
        [
            'isGroup' => true,
            'handle' => Group_Control_Typography::get_type(),
            'config' => [
                'name' => 'melody_time!melody-top-separator',
                'separator' => 'none', // elementor bug - separators don't work on group controls
                'label' => __('Font Style', 'melody'),
                'selector' => '{{WRAPPER}} .melody-c-time-font',
            ],
        ],
        [
            'isGroup' => true,
            'handle' => Group_Control_Text_Shadow::get_type(),
            'config' => [
                'name' => 'melody_time_text_shadow',
                'label' => __('Shadow', 'melody'),
                'selector' => '{{WRAPPER}} .melody-c-time-shadow',
            ],
        ],
        [
            'handle' => 'melody_time_color',
            'config' => [
                'label' => __('Color', 'melody'),
                'type' => Controls_Manager::COLOR,
                'default' => '#fff',
                'separator' => 'none',
                'selectors' => [
                    '{{WRAPPER}} .melody-c-time-color' => 'color: {{VALUE}}',
                ],
            ],
        ],
    ],
];
