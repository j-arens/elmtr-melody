<?php

use Elementor\Controls_Manager;

return [
    'version' => '1.0.0',
    'handle' => 'section_melody_toolbar_trackinfo',
    'config' => [
        'label' => __('Track Info', MELODY_TD),
        'tab' => Controls_Manager::TAB_STYLE,
    ],
    'inputs' => [
        [
            'handle' => 'melody_toolbar_trackinfo_margin_bottom',
            'config' => [
                'label' => __('Bottom Margin', MELODY_TD),
                'type' => Controls_Manager::SLIDER,
                'default' => [
                    'size' => 8,
                    'unit' => 'px',
                ],
                'size_units' => ['px', '%', 'em'],
                'range' => [
                    'px' => [
                        'min' => 0,
                        'step' => 1,
                    ],
                    '%' => [
                        'min' => 0,
                        'step' => 1,
                    ],
                    'em' => [
                        'min' => 0,
                        'step' => 1,
                    ],
                ],
                'selectors' => [
                    '{{WRAPPER}} .melody-c-trackinfo-margin' => 'margin-bottom: {{SIZE}}{{UNIT}};', 
                ],
            ],
        ],
        [
            'handle' => 'melody_toolbar_trackinfo_horizontal_padding',
            'config' => [
                'label' => __('Left & Right Padding', MELODY_TD),
                'type' => Controls_Manager::SLIDER,
                'default' => [
                    'size' => 30,
                    'unit' => 'px',
                ],
                'size_units' => ['px', '%', 'em'],
                'range' => [
                    'px' => [
                        'min' => 0,
                        'step' => 1,
                    ],
                    '%' => [
                        'min' => 0,
                        'step' => 1,
                    ],
                    'em' => [
                        'min' => 0,
                        'step' => 1,
                    ],
                ],
                'selectors' => [
                    '{{WRAPPER}} .melody-c-preview-padding' => 'padding: 0 {{SIZE}}{{UNIT}};', 
                ],
            ],
        ],
    ],
];
