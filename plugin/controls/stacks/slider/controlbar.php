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
    ],
];
