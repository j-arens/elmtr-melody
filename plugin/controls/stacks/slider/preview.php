<?php

use Elementor\Controls_Manager;
use Elementor\Group_Control_Box_Shadow;

return [
    'version' => '1.0.0',
    'handle' => 'section_melody_preview',
    'config' => [
        'label' => __('Preview'),
        'tab' => Controls_Manager::TAB_STYLE,
    ],
    'inputs' => [
        [
            'handle' => 'melody_preview_styles_heading',
            'config' => [
                'type' => Controls_Manager::HEADING,
                'label' => __('Styles'),
            ],
        ],
        [
            'handle' => 'melody_preview_bg_color',
            'config' => [
                'label' => __('Background Color'),
                'type' => Controls_Manager::COLOR,
                'default' => '#000',
                'selectors' => [
                    '{{WRAPPER}} .melody-c-preview-bg' => 'background-color: {{VALUE}}',
                ],
            ],
        ],
        [
            'handle' => 'melody_preview_min_height',
            'config' => [
                'label' => __('Min-height (px)'),
                'type' => Controls_Manager::NUMBER,
                'separator' => 'none',
                'default' => 300,
                'min' => 0,
                'placeholder' => 300,
                'step' => 1,
                'selectors' => [
                    '{{WRAPPER}} .melody-c-preview-min-height' => 'min-height: {{VALUE}}px;',
                ],
            ],
        ],
        [
            'handle' => 'melody_preview_padding',
            'config' => [
                'label' => __('Padding'),
                'type' => Controls_Manager::DIMENSIONS,
                'separator' => 'none',
                'default' => [
                    'size' => 30,
                    'unit' => 'px',
                ],
                'placeholder' => 30,
                'size_units' => ['px', 'em', '%'],
                'selectors' => [
                    '{{WRAPPER}} .melody-c-preview-padding' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ],
        ],
        [
            'handle' => 'melody_preview_image_heading',
            'config' => [
                'type' => Controls_Manager::HEADING,
                'label' => __('Image'),
            ],
        ],
        [
            'handle' => 'melody_preview_image_size',
            'config' => [
                'label' => __('Track Image Size (%)'),
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
                    '{{WRAPPER}} .melody-c-artwork-size' => 'background-size: {{SIZE}}{{UNIT}}',
                ],
            ],
        ],
        [
            'handle' => 'melody_preview_image_repeat',
            'config' => [
                'label' => __('Track Image Repeat'),
                'type' => Controls_Manager::SELECT,
                'separator' => 'none',
                'label_block' => true,
                'default' => 'no-repeat',
                'options' => [
                    'no-repeat' => __('no repeat'),
                    'repeat' => __('repeat'),
                    'repeat-x' => __('repeat x'),
                    'repeat-y' => __('repeat y'),
                ],
                'selectors' => [
                    '{{WRAPPER}} .melody-c-artwork-repeat' => 'background-repeat: {{VALUE}}',
                ],
            ],
        ],
        [
            'handle' => 'melody_preview_image_position',
            'config' => [
                'label' => __('Track Image Position'),
                'type' => Controls_Manager::SELECT,
                'separator' => 'none',
                'label_block' => true,
                'default' => 'center center',
                'options' => [
                    'center top' => __('center top'),
                    'center center' => __('center center'),
                    'center bottom' => __('center bottom'),
                    'left top' => __('left top'),
                    'left center' => __('left center'),
                    'left bottom' => __('left bottom'),
                    'right top' => __('right top'),
                    'right center' => __('right center'),
                    'right bottom' => __('right bottom'),
                ],
                'selectors' => [
                    '{{WRAPPER}} .melody-c-artwork-position' => 'background-position: {{VALUE}}',
                ],
            ],
        ],
        [
            'handle' => 'melody_preview_image_attachment',
            'config' => [
                'label' => __('Track Image Attachment'),
                'type' => Controls_Manager::SELECT,
                'separator' => 'none',
                'label_block' => true,
                'default' => 'scroll',
                'options' => [
                    'scroll' => __('scroll'),
                    'fixed' => __('fixed'),
                ],
                'selectors' => [
                    '{{WRAPPER}} .melody-c-artwork-attachment' => 'background-attachment: {{VALUE}}',
                ],
            ],
        ],
        [
            'handle' => 'melody_preview_animation_heading',
            'config' => [
                'type' => Controls_Manager::HEADING,
                'label' => __('Animation'),
            ],
        ],
        [
            'handle' => 'melody_preview_animation_duration',
            'config' => [
                'label' => __('Slider Duration (ms)'),
                'type' => Controls_Manager::SLIDER,
                'default' => [
                    'size' => 200,
                    'unit' => 'ms',
                ],
                'size_units' => ['ms'],
                'range' => [
                    'ms' => [
                        'min' => 0,
                        'max' => 1000,
                    ],
                ],
                'selectors' => [
                    '{{WRAPPER}} .melody-c-slider-transition' => 'transition-duration: {{SIZE}}{{UNIT}}',
                ],
            ],
        ],
        [
            'handle' => 'melody_preview_animation_timing!melody-no-separator',
            'config' => [
                'label' => __('Timing Function'),
                'type' => Controls_Manager::SELECT,
                'label_block' => true,
                // 'separator' => 'none',
                'default' => 'ease',
                'options' => [
                    'linear' => __('linear'),
                    'ease' => __('ease'),
                    'ease-in' => __('ease-in'),
                    'ease-out' => __('ease-out'),
                    'ease-in-out' => __('ease-in-out'),
                ],
                'selectors' => [
                    '{{WRAPPER}} .melody-c-slider-timing' => 'transition-timing-function: {{VALUE}}',
                ],
            ],
        ],
    ],
];
