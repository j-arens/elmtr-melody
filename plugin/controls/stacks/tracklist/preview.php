<?php

use Elementor\Controls_Manager;

return [
    'version' => '1.0.0',
    'handle' => 'section_melody_tracklist_preview_style',
    'config' => [
        'label' => __('Preview', MELODY_TD),
        'tab' => Controls_Manager::TAB_STYLE,
    ],
    'inputs' => [
        [
            'handle' => 'melody_tracklist_preview_padding',
            'isResponsive' => true,
            'config' => [
                'label' => __('Padding', MELODY_TD),
                'type' => Controls_Manager::DIMENSIONS,
                'devices' => ['desktop', 'tablet', 'mobile'],
                'desktop_default' => [
                    'top' => 16,
                    'bottom' => 16,
                    'left' => 16,
                    'right' => 16,
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
                    'top' => 0,
                    'bottom' => 0,
                    'left' => 0,
                    'right' => 0,
                    'unit' => 'px',
                ],
                'placeholder' => 16,
                'size_units' => ['px', 'em', '%'],
                'selectors' => [
                    '{{WRAPPER}} .melody-c-preview-padding' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ],
        ],
    ],
];
