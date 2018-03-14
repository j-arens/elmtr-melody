<?php

use Elementor\Controls_Manager;
use Elementor\Group_Control_Typography;
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
            'isGroup' => true,
            'handle' => Group_Control_Typography::get_type(),
            'config' => [
                'name' => 'melody_title',
                'label' => 'Title',
                'selector' => '{{WRAPPER}} [data-melody-title]',
            ],
        ],
        [
            'handle' => 'melody_title_color',
            'config' => [
                'label' => 'Title Color',
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} [data-melody-title]' => 'color: {{VALUE}}',
                ],
            ],
        ],
        [
            'isGroup' => true,
            'handle' => Group_Control_Typography::get_type(),
            'config' => [
                'name' => 'melody_artist',
                'label' => 'Artist',
                'selector' => '{{WRAPPER}} [data-melody-artist]',
            ],
        ],
        [
            'handle' => 'melody_artist_color',
            'config' => [
                'label' => 'Artist Color',
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} [data-melody-artist]' => 'color: {{VALUE}}',
                ],
            ],
        ],
        [
            'isGroup' => true,
            'handle' => Group_Control_Typography::get_type(),
            'config' => [
                'name' => 'melody_time',
                'label' => 'Time',
                'selector' => '{{WRAPPER}} [data-melody-time]',
            ],
        ],
        [
            'handle' => 'melody_time_color',
            'config' => [
                'label' => 'Time Color',
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} [data-melody-time]' => 'color: {{VALUE}}',
                ],
            ],
        ],
    ],
];