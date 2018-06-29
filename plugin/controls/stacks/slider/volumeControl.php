<?php

use Elementor\Controls_Manager;

return [
    'version' => '1.0.0',
    'handle' => 'section_melody_vol_control_style',
    'config' => [
        'label' => __('Volume Control'),
        'tab' => Controls_Manager::TAB_STYLE,
    ],
    'inputs' => [
        [
            'handle' => 'melody_slider_vol_control_primary_color',
            'config' => [
                'label' => __('Primary Color'),
                'type' => Controls_Manager::COLOR,
                'default' => '#fff',
                'selectors' => [
                    '{{WRAPPER}} .melody-c-vol-primary-color' => 'color: {{VALUE}}'
                ],
            ],
        ],
        [
            'handle' => 'melody_slider_vol_control_hover_color',
            'config' => [
                'label' => __('Hover Color'),
                'type' => Controls_Manager::COLOR,
                'default' => '#fff',
                'selectors' => [
                    '{{WRAPPER}} .melody-c-vol-hover-color:hover' => 'color: {{VALUE}}'
                ],
            ],
        ],
        [
            'handle' => 'melody_slider_vol_control_max_width',
            'config' => [
                'label' => __('Size'),
                'type' => Controls_Manager::SLIDER,
                'default' => [
                    'size' => 20,
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
                    '{{WRAPPER}} .melody-c-vol-width' => 'max-width: {{SIZE}}{{UNIT}};', 
                ],
            ],
        ],
    ],
];
