<?php

use Elementor\Controls_Manager;
use Elementor\Group_Control_Box_Shadow;

return [
    'version' => '1.0.0',
    'handle' => 'section_melody_controlbar_style',
    'config' => [
        'label' => __('Control Bar', MELODY_TD),
        'tab' => Controls_Manager::TAB_STYLE,
    ],
    'inputs' => [
        [
            'handle' => 'section_melody_slider_controlbar_style_heading',
            'config' => [
                'type' => Controls_Manager::HEADING,
                'label' => __('Style', MELODY_TD),
            ],
        ],
        [
            'handle' => 'melody_slider_control_bar_padding',
            'config' => [
                'label' => __('Padding', MELODY_TD),
                'type' => Controls_Manager::DIMENSIONS,
                'default' => [
                    'size' => 30,
                    'unit' => 'px',
                ],
                'placeholder' => 30,
                'size_units' => ['px', 'em', '%'],
                'selectors' => [
                    '{{WRAPPER}} .melody-c-controlbar' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ],
        ],
        [
            'handle' => 'melody_slider_control_bar_bg_color',
            'config' => [
                'label' => __('Background Color', MELODY_TD),
                'type' => Controls_Manager::COLOR,
                'default' => '#252525',
                'selectors' => [
                    '{{WRAPPER}} .melody-c-controlbar' => 'background-color: {{VALUE}}'
                ],
            ],
        ],
        [
            'isGroup' => true,
            'handle' => Group_Control_Box_Shadow::get_type(),
            'config' => [
                'name' => 'melody_slider_control_bar_box_shadow',
                'label' => __('Box Shadow', MELODY_TD),
                'selector' => '{{WRAPPER}} .melody-c-controlbar',
            ],
        ],
        [
            'handle' => 'section_melody_slider_controlbar_buttons_heading',
            'config' => [
                'type' => Controls_Manager::HEADING,
                'label' => __('Buttons', MELODY_TD),
            ],
        ],
        [
            'handle' => 'melody_slider_controlbar_btn_primary_color',
            'config' => [
                'label' => __('Primary Color', MELODY_TD),
                'type' => Controls_Manager::COLOR,
                'default' => '#4D4D4D',
                'selectors' => [
                    '{{WRAPPER}} .melody-c-btn-primary-color' => 'color: {{VALUE}}'
                ],
            ],
        ],
        [
            'handle' => 'melody_slider_controlbar_btn_hover_color',
            'config' => [
                'label' => __('Hover Color', MELODY_TD),
                'type' => Controls_Manager::COLOR,
                'default' => '#B0AFAF',
                'selectors' => [
                    '{{WRAPPER}} .melody-c-btn-hover-color:hover' => 'color: {{VALUE}}'
                ],
            ],
        ],
        [
            'handle' => 'melody_slider_controlbar_btn_on_color',
            'config' => [
                'label' => __('Shuffle/Repeat Enabled Color', MELODY_TD),
                'type' => Controls_Manager::COLOR,
                'default' => '#B0AFAF',
                'selectors' => [
                    '{{WRAPPER}} .melody-shuffle.melody-c-shuffle-on' => 'color: {{VALUE}}',
                    '{{WRAPPER}} .melody-repeat.melody-c-repeat-on' => 'color: {{VALUE}}'
                ],
            ],
        ],
        [
            'handle' => 'melody_slider_controlbar_btn_space',
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
                    '{{WRAPPER}} .melody-control-bar .melody-c-btn-space + .melody-c-btn-space' => 'margin-left: {{SIZE}}{{UNIT}};', 
                ],
            ],
        ],
        [
            'handle' => 'melody_slider_controlbar_btn_flex_alignment',
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
                    '{{WRAPPER}} .melody-control-bar' => 'justify-content: {{VALUE}};',
                ],
            ],
        ],
        [
            'handle' => 'melody_slider_controlbar_btn_max_width',
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
                    '{{WRAPPER}} .melody-control-bar .melody-playbackCtrl' => 'max-width: {{SIZE}}{{UNIT}};', 
                ],
            ],
        ],
    ],
];
