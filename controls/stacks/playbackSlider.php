<?php

use Elementor\Controls_Manager;

return [
    'version' => '1.0.0',
    'handle' => 'section_sliders_style',
    'config' => [
        'label' => 'Sliders',
        'tab' => Controls_Manager::TAB_STYLE,
    ],
    'inputs' => [
        [
            'handle' => 'melody_sliders_primary_color',
            'config' => [
                'label' => 'Primary Color',
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} [data-melody-scrubber-progress]::before' => 'background-color: {{VALUE}}',
                ],
            ],
        ],
        [
            'handle' => 'melody_sliders_background_color',
            'config' => [
                'label' => 'Background Color',
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} [data-melody-scrubber-progress]::after' => 'background-color: {{VALUE}}',
                ],
            ],
        ],
        [
            'handle' => 'melody_sliders_handle_color',
            'config' => [
                'label' => 'Handle Color',
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} [data-melody-scrubber-handle]' => 'background-color: {{VALUE}}',
                ],
            ],
        ],
    ],
];