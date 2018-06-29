<?php

use Elementor\Controls_Manager;

return [
    'version' => '1.0.0',
    'handle' => 'section_sliders_style',
    'config' => [
        'label' => __('Sliders', 'melody'),
        'tab' => Controls_Manager::TAB_STYLE,
    ],
    'inputs' => [
        [
            'handle' => 'melody_sliders_primary_color',
            'config' => [
                'label' => __('Primary Color', 'melody'),
                'type' => Controls_Manager::COLOR,
                'default' => '#fff',
                'selectors' => [
                    '{{WRAPPER}} [data-melody-scrubber-progress]::before' => 'background-color: {{VALUE}}',
                ],
            ],
        ],
        [
            'handle' => 'melody_sliders_background_color',
            'config' => [
                'label' => __('Background Color', 'melody'),
                'type' => Controls_Manager::COLOR,
                'default' => '#B0AFAF',
                'selectors' => [
                    '{{WRAPPER}} [data-melody-scrubber-progress]::after' => 'background-color: {{VALUE}}',
                ],
            ],
        ],
        [
            'handle' => 'melody_sliders_handle_color',
            'config' => [
                'label' => __('Handle Color', 'melody'),
                'type' => Controls_Manager::COLOR,
                'default' => '#fff',
                'selectors' => [
                    '{{WRAPPER}} [data-melody-scrubber-handle]' => 'background-color: {{VALUE}}',
                ],
            ],
        ],
    ],
];
