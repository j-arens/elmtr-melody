<?php

use Elementor\Controls_Manager;

return [
    'version' => '1.0.0',
    'handle' => 'section_melody_toolbar',
    'config' => [
        'label' => __('Toolbar', MELODY_TD),
        'tab' => Controls_Manager::TAB_STYLE,
    ],
    'inputs' => [
        [
            'handle' => 'melody_toolbar_bg_color',
            'config' => [
                'label' => __('Background Color', MELODY_TD),
                'type' => Controls_Manager::COLOR,
                'default' => '#252525',
                'selectors' => [
                    '{{WRAPPER}} .melody-c-toolbar' => 'background-color: {{VALUE}}'
                ],
            ],
        ],
        [
            'handle' => 'melody_toolbar_padding',
            'config' => [
                'label' => __('Padding', MELODY_TD),
                'type' => Controls_Manager::DIMENSIONS,
                'default' => [
                    'top' => [
                        'size' => '12',
                        'unit' => 'px',
                    ],
                    'bottom' => [
                        'size' => '12',
                        'unit' => 'px',
                    ],
                    'left' => [
                        'size' => '16',
                        'unit' => 'px',
                    ],
                    'right' => [
                        'size' => '16',
                        'unit' => 'px',
                    ],
                ],
                'placeholder' => 8,
                'size_units' => ['px', 'em', '%'],
                'selectors' => [
                    '{{WRAPPER}} .melody-c-toolbar' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ],
        ],
        [
            'handle' => 'melody_toolbar_left_controls_width',
            'config' => [
                'label' => __('Left Controls Width (%)', MELODY_TD),
                'type' => Controls_Manager::SLIDER,
                'default' => [
                    'size' => 15,
                    'unit' => '%',
                ],
                'size_units' => ['%'],
                'range' => [
                    '%' => [
                        'min' => 0,
                        'step' => 1,
                    ],
                ],
                'selectors' => [
                    '{{WRAPPER}} .melody-controls-left' => 'flex-basis: {{SIZE}}{{UNIT}};', 
                ],
            ],
        ],
        [
            'handle' => 'melody_toolbar_right_controls_width',
            'config' => [
                'label' => __('Right Controls Width (%)', MELODY_TD),
                'type' => Controls_Manager::SLIDER,
                'default' => [
                    'size' => 15,
                    'unit' => '%',
                ],
                'size_units' => ['%'],
                'range' => [
                    '%' => [
                        'min' => 0,
                        'step' => 1,
                    ],
                ],
                'selectors' => [
                    '{{WRAPPER}} .melody-controls-right' => 'flex-basis: {{SIZE}}{{UNIT}};', 
                ],
            ],
        ],
        [
            'handle' => 'melody_toolbar_trackinfo_width',
            'config' => [
                'label' => __('Track Info Width (%)', MELODY_TD),
                'type' => Controls_Manager::SLIDER,
                'default' => [
                    'size' => 70,
                    'unit' => '%',
                ],
                'size_units' => ['%'],
                'range' => [
                    '%' => [
                        'min' => 0,
                        'step' => 1,
                    ],
                ],
                'selectors' => [
                    '{{WRAPPER}} .melody-c-trackinfo-width' => 'flex-basis: {{SIZE}}{{UNIT}};', 
                ],
            ],
        ],
    ],
];
