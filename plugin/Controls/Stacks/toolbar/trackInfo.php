<?php

use Elementor\Controls_Manager;

return [
    'version' => '1.0.0',
    'handle' => 'section_melody_toolbar_trackinfo',
    'config' => [
        'label' => __('Track Info', 'melody'),
        'tab' => Controls_Manager::TAB_STYLE,
    ],
    'inputs' => [
        [
            'handle' => 'melody_toolbar_trackinfo_margin_bottom',
            'config' => [
                'label' => __('Bottom Margin', 'melody'),
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
            'handle' => 'melody_toolbar_trackinfo_padding',
            'isResponsive' => true,
            'config' => [
                'label' => __('Padding', 'melody'),
                'type' => Controls_Manager::DIMENSIONS,
                'devices' => ['desktop', 'tablet', 'mobile'],
                'desktop_default' => [
                    'top' => 0,
                    'bottom' => 0,
                    'left' => 30,
                    'right' => 30,
                    'unit' => 'px',
                ],
                'tablet_default' => [
                    'top' => 0,
                    'bottom' => 0,
                    'left' => 0,
                    'right' => 0,
                    'unit' => 'px',
                ],
                'mobile_default' => [
                    'top' => 25,
                    'bottom' => 25,
                    'left' => 0,
                    'right' => 0,
                    'unit' => 'px',
                ],
                'placeholder' => 30,
                'size_units' => ['px', 'em', '%'],
                'selectors' => [
                    '{{WRAPPER}} .melody-c-preview-padding' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ],
        ],
    ],
];
