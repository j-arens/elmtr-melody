<?php

use Elementor\Controls_Manager;
use Elementor\Group_Control_Typography;
use Elementor\Group_Control_Text_Shadow;
use Elementor\Scheme_Typography;

return [
    'version' => '1.0.0',
    'handle' => 'section_melody_typography',
    'config' => [
        'label' => 'Typography',
        'tab' => Controls_Manager::TAB_STYLE,
    ],
    'inputs' => [
        [
            'handle' => 'section_melody_typography_title',
            'config' => [
                'type' => Controls_Manager::HEADING,
                'label' => 'Track Title',
            ],
        ],
        [
            'isGroup' => true,
            'handle' => Group_Control_Typography::get_type(),
            'config' => [
                'name' => 'melody_title',
                'label' => 'Font Style',
                'selector' => '{{WRAPPER}} [data-melody-title]',
            ],
        ],
        [
            'isGroup' => true,
            'handle' => Group_Control_Text_Shadow::get_type(),
            'config' => [
                'name' => 'melody_title_text_shadow',
                'label' => 'Shadow',
                'selector' => '{{WRAPPER}} [data-melody-title]',
                // 'separator' => 'none', no separator options exposed for text shadow group control
            ],
        ],
        [
            'handle' => 'melody_title_color',
            'config' => [
                'label' => 'Color',
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
                'label' => 'Artist',
            ],
        ],
        [
            'isGroup' => true,
            'handle' => Group_Control_Typography::get_type(),
            'config' => [
                'name' => 'melody_artist',
                'label' => 'Font Style',
                'selector' => '{{WRAPPER}} [data-melody-artist]',
            ],
        ],
        [
            'isGroup' => true,
            'handle' => Group_Control_Text_Shadow::get_type(),
            'config' => [
                'name' => 'melody_artist_text_shadow',
                'label' => 'Shadow',
                'selector' => '{{WRAPPER}} [data-melody-artist]',
                // 'separator' => 'none', no separator options exposed for text shadow group control
            ],
        ],
        [
            'handle' => 'melody_artist_color',
            'config' => [
                'label' => 'Color',
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
                'label' => 'Time',
            ],
        ],
        [
            'isGroup' => true,
            'handle' => Group_Control_Typography::get_type(),
            'config' => [
                'name' => 'melody_time',
                'label' => 'Font Style',
                'selector' => '{{WRAPPER}} [data-melody-time]',
            ],
        ],
        [
            'isGroup' => true,
            'handle' => Group_Control_Text_Shadow::get_type(),
            'config' => [
                'name' => 'melody_time_text_shadow',
                'label' => 'Shadow',
                'selector' => '{{WRAPPER}} [data-melody-time]',
                // 'separator' => 'none', no separator options exposed for text shadow group control
            ],
        ],
        [
            'handle' => 'melody_time_color',
            'config' => [
                'label' => 'Color',
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