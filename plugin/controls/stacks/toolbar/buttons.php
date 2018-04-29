<?php

use Elementor\Controls_Manager;

return [
    'version' => '1.0.0',
    'handle' => 'section_melody_btn_style',
    'config' => [
        'label' => __('Buttons', MELODY_TD),
        'tab' => Controls_Manager::TAB_STYLE,
    ],
    'inputs' => [
        [
            'handle' => 'melody_btn_primary_color',
            'config' => [
                'label' => __('Primary Color', MELODY_TD),
                'type' => Controls_Manager::COLOR,
                'default' => '#4D4D4D',
                'selectors' => [
                    '{{WRAPPER}} [data-melody-controls] > *' => 'color: {{VALUE}}',
                ],
            ],
        ],
        [
            'handle' => 'melody_btn_hover_color',
            'config' => [
                'label' => __('Hover Color', MELODY_TD),
                'type' => Controls_Manager::COLOR,
                'default' => '#B0AFAF',
                'selectors' => [
                    '{{WRAPPER}} [data-melody-controls] button:hover' => 'color: {{VALUE}}',
                ],
            ],
        ],
        [
            'handle' => 'melody_btn_on_color',
            'config' => [
                'label' => __('Shuffle/Repeat Enabled Color', MELODY_TD),
                'type' => Controls_Manager::COLOR,
                'default' => '#B0AFAF',
                'selectors' => [
                    '{{WRAPPER}} button[data-melody-shuffle-control="true"]' => 'color: {{VALUE}}',
                    '{{WRAPPER}} button[data-melody-repeat-control="true"]' => 'color: {{VALUE}}',
                ],
            ],
        ],
        [
            'handle' => 'section_melody_btns_left',
            'config' => [
                'type' => Controls_Manager::HEADING,
                'label' => __('Left', MELODY_TD),
            ],
        ],
        [
            'handle' => 'melody_btns_left_max_width',
            'config' => [
                'label' => __('Size', MELODY_TD),
                'type' => Controls_Manager::SLIDER,
                'default' => [
                    'size' => 30,
                    'unit' => 'px',
                ],
                'size_units' => ['px'],
                'range' => [
                    'px' => [
                        'min' => 0,
                        'step' => 1,
                    ],
                ],
                'selectors' => [
                    '{{WRAPPER}} [data-melody-controls-left] .melody-playbackCtrl' => 'max-width: {{SIZE}}{{UNIT}};', 
                ],
            ],
        ],
        [
            'handle' => 'melody_btns_left_space',
            'config' => [
                'label' => __('Spacing', MELODY_TD),
                'type' => Controls_Manager::SLIDER,
                'default' => [
                    'size' => 30,
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
                    '{{WRAPPER}} [data-melody-controls-left] button + button' => 'margin-left: {{SIZE}}{{UNIT}};', 
                ],
            ],
        ],
        [
            'handle' => 'melody_btns_left_flex_alignment',
            'config' => [
                'label' => __('Alignment', MELODY_TD),
                'type' => Controls_Manager::CHOOSE,
                'options' => [
                    'flex-start' => [
                        'title' => __('Left', MELODY_TD),
                        'icon' => 'fa fa-align-left',
                    ],
                    'center' => [
                        'title' => __('Center', MELODY_TD),
                        'icon' => 'fa fa-align-center',
                    ],
                    'flex-end' => [
                        'title' => __('Right', MELODY_TD),
                        'icon' => 'fa fa-align-right',
                    ],
                ],
                'default' => 'center',
                'selectors' => [
                    '{{WRAPPER}} [data-melody-controls-left]' => 'justify-content: {{VALUE}};',
                ],
            ],
        ],
        [
            'handle' => 'section_melody_btns_right',
            'config' => [
                'type' => Controls_Manager::HEADING,
                'label' => __('Right', MELODY_TD),
            ],
        ],
        [
            'handle' => 'melody_btns_right_max_width',
            'config' => [
                'label' => __('Size', MELODY_TD),
                'type' => Controls_Manager::SLIDER,
                'default' => [
                    'size' => 30,
                    'unit' => 'px',
                ],
                'size_units' => ['px'],
                'range' => [
                    'px' => [
                        'min' => 0,
                        'step' => 1,
                    ],
                ],
                'selectors' => [
                    '{{WRAPPER}} [data-melody-controls-right] .melody-playbackCtrl' => 'max-width: {{SIZE}}{{UNIT}};', 
                ],
            ],
        ],
        [
            'handle' => 'melody_btns_right_space',
            'config' => [
                'label' => __('Spacing', MELODY_TD),
                'type' => Controls_Manager::SLIDER,
                'default' => [
                    'size' => 30,
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
                    '{{WRAPPER}} [data-melody-controls-right] button + button' => 'margin-left: {{SIZE}}{{UNIT}};', 
                ],
            ],
        ],
        [
            'handle' => 'melody_btns_right_flex_alignment',
            'config' => [
                'label' => __('Alignment', MELODY_TD),
                'type' => Controls_Manager::CHOOSE,
                'options' => [
                    'flex-start' => [
                        'title' => __('Left', MELODY_TD),
                        'icon' => 'fa fa-align-left',
                    ],
                    'center' => [
                        'title' => __('Center', MELODY_TD),
                        'icon' => 'fa fa-align-center',
                    ],
                    'flex-end' => [
                        'title' => __('Right', MELODY_TD),
                        'icon' => 'fa fa-align-right',
                    ],
                ],
                'default' => 'center',
                'selectors' => [
                    '{{WRAPPER}} [data-melody-controls-right]' => 'justify-content: {{VALUE}};',
                ],
            ],
        ],
    ],
];
