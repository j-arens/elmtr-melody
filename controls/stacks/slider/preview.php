<?php

use Elementor\Controls_Manager;

return [
    'version' => '1.0.0',
    'handle' => 'section_melody_preview',
    'config' => [
        'label' => 'Preview',
        'tab' => Controls_Manager::TAB_STYLE,
        'condition' => [
            'melody_component_style' => 'skinny-bar',
        ],
    ],
    'inputs' => [
        [
            'handle' => 'melody_preview_padding',
            'config' => [
                'label' => 'Padding',
                'type' => Controls_Manager::DIMENSIONS,
                'default' => [
                    'size' => 30,
                    'unit' => 'px',
                ],
                'size_units' => ['px', 'em', '%'],
                'selectors' => [
                    '{{WRAPPER}} [data-melody-preview]' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ],
        ],
        [
            'handle' => 'melody_preview_bg_color',
            'config' => [
                'label' => 'Background Color',
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} [data-melody-preview]' => 'background-color: {{VALUE}}',
                ],
            ],
        ],
        [
            'handle' => 'melody_preview_image_size',
            'config' => [
                'label' => 'Track Image Size (%)',
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
                'label' => 'Track Image Repeat',
                'type' => Controls_Manager::SELECT,
                'label_block' => true,
                'default' => 'no-repeat',
                'options' => [
                    'no-repeat' => 'no repeat',
                    'repeat' => 'repeat',
                    'repeat-x' => 'repeat x',
                    'repeat-y' => 'repeat y',
                ],
                'selectors' => [
                    '{{WRAPPER}} [data-melody-artwork]' => 'background-repeat: {{VALUE}}'
                ],
            ],
        ],
        [
            'handle' => 'melody_preview_image_position',
            'config' => [
                'label' => 'Track Image Position',
                'type' => Controls_Manager::SELECT,
                'label_block' => true,
                'default' => 'center center',
                'options' => [
                    'center top' => 'center top',
                    'center center' => 'center center',
                    'center bottom' => 'center bottom',
                    'left top' => 'left top',
                    'left center' => 'left center',
                    'left bottom' => 'left bottom',
                    'right top' => 'right top',
                    'right center' => 'right center',
                    'right bottom' => 'right bottom',
                ],
                'selectors' => [
                    '{{WRAPPER}} [data-melody-artwork]' => 'background-position: {{VALUE}}'
                ],
            ],
        ],
        [
            'handle' => 'melody_preview_image_attachment',
            'config' => [
                'label' => 'Track Image Attachment',
                'type' => Controls_Manager::SELECT,
                'label_block' => true,
                'default' => 'scroll',
                'options' => [
                    'scroll' => 'scroll',
                    'fixed' => 'fixed',
                ],
                'selectors' => [
                    '{{WRAPPER}} [data-melody-artwork]' => 'background-attachment: {{VALUE}}'
                ],
            ],
        ],
    ],
];