<?php

use Elementor\Controls_Manager;

return [
    'version' => '1.0.0',
    'handle' => 'section_melody_controlbar_style',
    'config' => [
        'label' => 'Control Bar',
        'tab' => Controls_Manager::TAB_STYLE,
    ],
    'inputs' => [
        [
            'handle' => 'melody_control_bar_width',
            'config' => [
                'label' => 'Width',
                'type' => Controls_Manager::SLIDER,
                'default' => [
                    'size' => '100',
                    'unit' => '%',
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
            ],
        ],
        [
            'handle' => 'melody_control_bar_padding',
            'config' => [
                'label' => 'Padding',
                'type' => Controls_Manager::DIMENSIONS,
                'default' => [
                    'size' => 30,
                    'unit' => 'px',
                ],
                'size_units' => ['px', 'em', '%'],
                'selectors' => [
                    '{{WRAPPER}} [data-melody-control-bar]' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ],
        ],
        [
            'handle' => 'melody_control_bar_bg_color',
            'config' => [
                'label' => 'Background color',
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} [data-melody-control-bar]' => 'background-color: {{VALUE}}'
                ],
            ],
        ],
    ],
];