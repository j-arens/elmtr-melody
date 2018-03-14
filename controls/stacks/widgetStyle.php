<?php

use Elementor\Controls_Manager;
use Elementor\Group_Control_Border;
use Elementor\Group_Control_Box_Shadow;

return [
    'version' => '1.0.0',
    'handle' => 'section_melody_style',
    'config' => [
        'label' => 'Widget',
        'tab' => Controls_Manager::TAB_STYLE,
    ],
    'inputs' => [
        [
            'handle' => 'melody_component_style',
            'config' => [
                'label' => 'Style',
                'type' => Controls_Manager::SELECT,
                'label_block' => true,
                'default' => 'skinny-bar',
                'options' => [
                    'skinny-bar' => 'Skinny Bar',
                    'medium-bar' => 'Medium Bar',
                    'full-single' => 'Full Single',
                    'full-list' => 'Full List',
                ],
            ],
        ],
        [
            'isGroup' => true,
            'handle' => Group_Control_Border::get_type(),
            'config' => [
                'name' => 'melody_component_border',
                'label' => 'Border',
                'label_block' => true,
                'selector' => '{{WRAPPER}} [data-melody-border]',
                'separator' => 'before',
            ],
        ],
        [
            'handle' => 'melody_component_border_radius',
            'config' => [
                'label' => 'Border radius',
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => ['px'],
                'selectors' => [
                    '{{WRAPPER}} [data-melody-border]' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ],
        ],
        [
            'isGroup' => true,
            'handle' => Group_Control_Box_Shadow::get_type(),
            'config' => [
                'name' => 'melody_component_box_shadow',
                'selector' => '{{WRAPPER}} [data-melody-border]',
            ],
        ],
    ],
];