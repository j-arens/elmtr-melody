<?php

use Elementor\Controls_Manager;
use Elementor\Group_Control_Border;

return [
    'version' => '1.0.0',
    'handle' => 'section_melody_tracklist_track_style',
    'config' => [
        'label' => __('Track', MELODY_TD),
        'tab' => Controls_Manager::TAB_STYLE,
    ],
    'inputs' => [
        [
            'handle' => 'melody_tracklist_track_padding',
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
                    '{{WRAPPER}} .melody-c-track-padding' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ],
        ],
        [
            'handle' => 'melody_tracklist_track_border_style',
            'config' => [
                'label' => __('Border Top Style', MELODY_TD),
                'type' => Controls_Manager::SELECT,
                'label_block' => true,
                'default' => 'solid',
                'options' => [
                    'solid' => __('solid', MELODY_TD),
                    'dashed' => __('dashed', MELODY_TD),
                    'dotted' => __('dotted', MELODY_TD),
                    'double' => __('double', MELODY_TD),
                ],
                'selectors' => [
                    '{{WRAPPER}} .melody-tracklist__track.melody-c-border-style' => 'border-top-style: {{VALUE}}',
                ],
            ],
        ],
        [
            'handle' => 'melody_tracklist_track_border_width',
            'config' => [
                'label' => __('Border Top Width', MELODY_TD),
                'type' => Controls_Manager::SLIDER,
                'default' => [
                    'size' => 2,
                    'unit' => 'px',
                ],
                'size_units' => ['px'],
                'range' => [
                    'ms' => [
                        'min' => 0,
                        'max' => 50,
                    ],
                ],
                'selectors' => [
                    '{{WRAPPER}} .melody-tracklist__track.melody-c-border-width' => 'border-top-width: {{SIZE}}{{UNIT}}',
                ],
            ],
        ],
        [
            'handle' => 'melody_tracklist_track_border_color',
            'config' => [
                'label' => __('Border Top Color', MELODY_TD),
                'type' => Controls_Manager::COLOR,
                'default' => '#000',
                'selectors' => [
                    '{{WRAPPER}} .melody-tracklist__track.melody-c-border-color' => 'border-top-color: {{VALUE}}',
                ],
            ],
        ],
    ],
];
