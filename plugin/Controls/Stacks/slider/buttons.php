<?php

use Elementor\Controls_Manager;

return [
    'version' => '1.0.0',
    'handle' => 'section_melody_slider_buttons',
    'config' => [
        'label' => __('Buttons', 'melody'),
        'tab' => Controls_Manager::TAB_STYLE,
    ],
    'inputs' => [
        [
            'handle' => 'section_melody_slider_buttons_colors_heading',
            'config' => [
                'type' => Controls_Manager::HEADING,
                'label' => __('Colors', 'melody'),
            ],
        ],
        [
            'handle' => 'melody_slider_buttons_primary_color',
            'config' => [
                'label' => __('Primary Color', 'melody'),
                'type' => Controls_Manager::COLOR,
                'default' => '#4D4D4D',
                'separator' => 'before',
                'selectors' => [
                    '{{WRAPPER}} .melody-c-btn-primary-color' => 'color: {{VALUE}}'
                ],
            ],
        ],
        [
            'handle' => 'melody_slider_buttons_hover_color',
            'config' => [
                'label' => __('Hover Color', 'melody'),
                'type' => Controls_Manager::COLOR,
                'separator' => 'none',
                'default' => '#B0AFAF',
                'selectors' => [
                    '{{WRAPPER}} .melody-c-btn-hover-color:hover' => 'color: {{VALUE}}',
                    '{{WRAPPER}} .melody-c-btn-hover-color--hovered' => 'color: {{VALUE}}',
                ],
            ],
        ],
        [
            'handle' => 'melody_slider_buttons_on_color',
            'config' => [
                'label' => __('Shuffle/Repeat Enabled Color', 'melody'),
                'type' => Controls_Manager::COLOR,
                'separator' => 'none',
                'default' => '#B0AFAF',
                'selectors' => [
                    '{{WRAPPER}} .melody-shuffle.melody-c-shuffle-on' => 'color: {{VALUE}}',
                    '{{WRAPPER}} .melody-repeat.melody-c-repeat-on' => 'color: {{VALUE}}',
                    '{{WRAPPER}} .melody-shuffle.melody-c-on-color--enabled' => 'color: {{VALUE}}',
                    '{{WRAPPER}} .melody-repeat.melody-c-on-color--enabled' => 'color: {{VALUE}}',
                ],
            ],
        ],
        [
            'handle' => 'section_melody_slider_buttons_placement_heading',
            'config' => [
                'type' => Controls_Manager::HEADING,
                'label' => __('Placement', 'melody'),
                'separator' => 'before',
            ],
        ],
        [
            'handle' => 'melody_slider_buttons_btn_max_width',
            'config' => [
                'label' => __('Size', 'melody'),
                'separator' => 'before',
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
                    '{{WRAPPER}} .melody-control-bar .melody-playbackCtrl' => 'max-width: {{SIZE}}{{UNIT}};', 
                ],
            ],
        ],
        [
            'handle' => 'melody_slider_buttons_btn_space',
            'config' => [
                'label' => __('Spacing', 'melody'),
                'type' => Controls_Manager::SLIDER,
                'separator' => 'none',
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
                    '{{WRAPPER}} .melody-control-bar .melody-c-btn-space + .melody-c-btn-space' => 'margin-left: {{SIZE}}{{UNIT}};', 
                ],
            ],
        ],
        [
            'handle' => 'melody_slider_buttons_btn_flex_alignment',
            'config' => [
                'label' => __('Alignment', 'melody'),
                'type' => Controls_Manager::CHOOSE,
                'separator' => 'none',
                'options' => [
                    'flex-start' => [
                        'title' => __('Left', 'melody'),
                        'icon' => 'fa fa-align-left',
                    ],
                    'center' => [
                        'title' => __('Center', 'melody'),
                        'icon' => 'fa fa-align-center',
                    ],
                    'flex-end' => [
                        'title' => __('Right', 'melody'),
                        'icon' => 'fa fa-align-right',
                    ],
                ],
                'default' => 'center',
                'selectors' => [
                    '{{WRAPPER}} .melody-control-bar' => 'justify-content: {{VALUE}};',
                ],
            ],
        ],
    ],
];
