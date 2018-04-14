<?php

use Elementor\Controls_Manager;
use Elementor\Group_Control_Box_Shadow;

return [
    'version' => '1.0.0',
    'handle' => 'section_melody_preview',
    'config' => [
        'label' => __('Preview', MELODY_TD),
        'tab' => Controls_Manager::TAB_STYLE,
    ],
    'inputs' => [
        [
            'handle' => 'melody_preview_min_height',
            'config' => [
                'label' => __('Min-height (px)', MELODY_TD),
                'type' => Controls_Manager::NUMBER,
                'default' => 300,
                'min' => 0,
                'placeholder' => 300,
                'step' => 1,
                'selectors' => [
                    '{{WRAPPER}} [data-melody-preview]' => 'min-height: {{VALUE}}px;',
                ],
            ],
        ],
        [
            'handle' => 'melody_preview_padding',
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
                    '{{WRAPPER}} [data-melody-preview]' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ],
        ],
        [
            'handle' => 'melody_preview_bg_color',
            'config' => [
                'label' => __('Background Color', MELODY_TD),
                'type' => Controls_Manager::COLOR,
                'default' => '#000',
                'selectors' => [
                    '{{WRAPPER}} [data-melody-preview]' => 'background-color: {{VALUE}}',
                ],
            ],
        ],
        [
            'handle' => 'melody_preview_image_size',
            'config' => [
                'label' => __('Track Image Size (%)', MELODY_TD),
                'label_block' => true,
                'type' => Controls_Manager::SLIDER,
                'default' => [
                    'size' => 100,
                    'unit' => '%',
                ],
                'size_units' => ['%'],
                'range' => [
                    '%' => [
                        'min' => 1,
                        'max' => 100,
                    ],
                ],
                'selectors' => [
                    '{{WRAPPER}} [data-melody-artwork]' => 'background-size: {{SIZE}}{{UNIT}}'
                ],
            ],
        ],
        [
            'handle' => 'melody_preview_image_repeat',
            'config' => [
                'label' => __('Track Image Repeat', MELODY_TD),
                'type' => Controls_Manager::SELECT,
                'label_block' => true,
                'default' => 'no-repeat',
                'options' => [
                    'no-repeat' => __('no repeat', MELODY_TD),
                    'repeat' => __('repeat', MELODY_TD),
                    'repeat-x' => __('repeat x', MELODY_TD),
                    'repeat-y' => __('repeat y', MELODY_TD),
                ],
                'selectors' => [
                    '{{WRAPPER}} [data-melody-artwork]' => 'background-repeat: {{VALUE}}'
                ],
            ],
        ],
        [
            'handle' => 'melody_preview_image_position',
            'config' => [
                'label' => __('Track Image Position', MELODY_TD),
                'type' => Controls_Manager::SELECT,
                'label_block' => true,
                'default' => 'center center',
                'options' => [
                    'center top' => __('center top', MELODY_TD),
                    'center center' => __('center center', MELODY_TD),
                    'center bottom' => __('center bottom', MELODY_TD),
                    'left top' => __('left top', MELODY_TD),
                    'left center' => __('left center', MELODY_TD),
                    'left bottom' => __('left bottom', MELODY_TD),
                    'right top' => __('right top', MELODY_TD),
                    'right center' => __('right center', MELODY_TD),
                    'right bottom' => __('right bottom', MELODY_TD),
                ],
                'selectors' => [
                    '{{WRAPPER}} [data-melody-artwork]' => 'background-position: {{VALUE}}'
                ],
            ],
        ],
        [
            'handle' => 'melody_preview_image_attachment',
            'config' => [
                'label' => __('Track Image Attachment', MELODY_TD),
                'type' => Controls_Manager::SELECT,
                'label_block' => true,
                'default' => 'scroll',
                'options' => [
                    'scroll' => __('scroll', MELODY_TD),
                    'fixed' => __('fixed', MELODY_TD),
                ],
                'selectors' => [
                    '{{WRAPPER}} [data-melody-artwork]' => 'background-attachment: {{VALUE}}'
                ],
            ],
        ],
    ],
];