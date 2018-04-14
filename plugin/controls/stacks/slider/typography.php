<?php

use Elementor\Controls_Manager;
use Elementor\Group_Control_Typography;
use Elementor\Group_Control_Text_Shadow;
use Elementor\Scheme_Typography;

return [
    'version' => '1.0.0',
    'handle' => 'section_melody_typography',
    'config' => [
        'label' => __('Typography', MELODY_TD),
        'tab' => Controls_Manager::TAB_STYLE,
    ],
    'inputs' => [
        [
            'handle' => 'section_melody_typography_title',
            'config' => [
                'type' => Controls_Manager::HEADING,
                'label' => __('Track Title', MELODY_TD),
            ],
        ],
        [
            'isGroup' => true,
            'handle' => Group_Control_Typography::get_type(),
            'config' => [
                'name' => 'melody_title',
                'label' => __('Font Style', MELODY_TD),
                'selector' => '{{WRAPPER}} [data-melody-title]',
            ],
        ],
        [
            'isGroup' => true,
            'handle' => Group_Control_Text_Shadow::get_type(),
            'config' => [
                'name' => 'melody_title_text_shadow',
                'label' => __('Shadow', MELODY_TD),
                'selector' => '{{WRAPPER}} [data-melody-title]',
                // 'separator' => 'none', no separator options exposed for text shadow group control
            ],
        ],
        [
            'handle' => 'melody_title_color',
            'config' => [
                'label' => __('Color', MELODY_TD),
                'type' => Controls_Manager::COLOR,
                'default' => '#fff',
                'separator' => 'none',
                'selectors' => [
                    '{{WRAPPER}} [data-melody-title]' => 'color: {{VALUE}}',
                ],
            ],
        ],
        [
            'handle' => 'section_melody_typography_artist',
            'config' => [
                'type' => Controls_Manager::HEADING,
                'label' => __('Artist', MELODY_TD),
            ],
        ],
        [
            'isGroup' => true,
            'handle' => Group_Control_Typography::get_type(),
            'config' => [
                'name' => 'melody_artist',
                'label' => __('Font Style', MELODY_TD),
                'selector' => '{{WRAPPER}} [data-melody-artist]',
            ],
        ],
        [
            'isGroup' => true,
            'handle' => Group_Control_Text_Shadow::get_type(),
            'config' => [
                'name' => 'melody_artist_text_shadow',
                'label' => __('Shadow', MELODY_TD),
                'selector' => '{{WRAPPER}} [data-melody-artist]',
                // 'separator' => 'none', no separator options exposed for text shadow group control
            ],
        ],
        [
            'handle' => 'melody_artist_color',
            'config' => [
                'label' => __('Color', MELODY_TD),
                'type' => Controls_Manager::COLOR,
                'default' => '#fff',
                'separator' => 'none',
                'selectors' => [
                    '{{WRAPPER}} [data-melody-artist]' => 'color: {{VALUE}}',
                ],
            ],
        ],
        [
            'handle' => 'section_melody_typography_time',
            'config' => [
                'type' => Controls_Manager::HEADING,
                'label' => __('Time', MELODY_TD),
            ],
        ],
        [
            'isGroup' => true,
            'handle' => Group_Control_Typography::get_type(),
            'config' => [
                'name' => 'melody_time',
                'label' => __('Font Style', MELODY_TD),
                'selector' => '{{WRAPPER}} [data-melody-time]',
            ],
        ],
        [
            'isGroup' => true,
            'handle' => Group_Control_Text_Shadow::get_type(),
            'config' => [
                'name' => 'melody_time_text_shadow',
                'label' => __('Shadow', MELODY_TD),
                'selector' => '{{WRAPPER}} [data-melody-time]',
                // 'separator' => 'none', no separator options exposed for text shadow group control
            ],
        ],
        [
            'handle' => 'melody_time_color',
            'config' => [
                'label' => __('Color', MELODY_TD),
                'type' => Controls_Manager::COLOR,
                'default' => '#fff',
                'separator' => 'none',
                'selectors' => [
                    '{{WRAPPER}} [data-melody-time]' => 'color: {{VALUE}}',
                ],
            ],
        ],
    ],
];
