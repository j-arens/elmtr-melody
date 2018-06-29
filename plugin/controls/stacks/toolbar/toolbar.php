<?php

use Elementor\Controls_Manager;

return [
    'version' => '1.0.0',
    'handle' => 'section_melody_toolbar',
    'config' => [
        'label' => __('Toolbar', 'melody'),
        'tab' => Controls_Manager::TAB_STYLE,
    ],
    'inputs' => [
        [
            'handle' => 'melody_toolbar_bg_color',
            'config' => [
                'label' => __('Background Color', 'melody'),
                'type' => Controls_Manager::COLOR,
                'default' => '#252525',
                'selectors' => [
                    '{{WRAPPER}} .melody-c-toolbar' => 'background-color: {{VALUE}}'
                ],
            ],
        ],
        [
            'handle' => 'melody_toolbar_padding',
            'isResponsive' => true,
            'config' => [
                'label' => __('Padding', 'melody'),
                'type' => Controls_Manager::DIMENSIONS,
                'devices' => ['desktop', 'tablet', 'mobile'],
                'desktop_default' => [
                    'top' => 8,
                    'bottom' => 8,
                    'left' => 8,
                    'right' => 8,
                    'unit' => 'px',
                ],
                'tablet_default' => [
                    'top' => 8,
                    'bottom' => 8,
                    'left' => 16,
                    'right' => 16,
                    'unit' => 'px',
                ],
                'mobile_default' => [
                    'top' => 20,
                    'bottom' => 20,
                    'left' => 16,
                    'right' => 16,
                    'unit' => 'px',
                ],
                'placeholder' => 8,
                'size_units' => ['px', 'em', '%'],
                'selectors' => [
                    '{{WRAPPER}} .melody-c-toolbar' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ],
        ],
        [
            'handle' => 'section_melody_toolbar_primary_controls_heading',
            'config' => [
                'type' => Controls_Manager::HEADING,
                'label' => __('Primary Controls', 'melody'),
            ],
        ],
        [
            'handle' => 'melody_toolbar_primary_controls_width',
            'isResponsive' => true,
            'config' => [
                'label' => __('Primary Controls Width (%)', 'melody'),
                'type' => Controls_Manager::SLIDER,
                'size_units' => ['%'],
                'range' => [
                    '%' => [
                        'min' => 0,
                        'step' => 1,
                    ],
                ],
                'devices' => ['desktop', 'tablet', 'mobile'],
                'desktop_default' => [
                    'size' => 15,
                    'unit' => '%',
                ],
                'tablet_default' => [
                    'size' => 20,
                    'unit' => '%',
                ],
                'mobile_default' => [
                    'size' => 100,
                    'unit' => '%'
                ],
                'selectors' => [
                    '{{WRAPPER}} .melody-controls-primary' => 'flex-basis: {{SIZE}}{{UNIT}};', 
                ],
            ],
        ],
        [
            'handle' => 'melody_toolbar_primary_controls_order',
            'isResponsive' => true,
            'config' => [
                'label' => __('Primary Controls Order', 'melody'),
                'separator' => 'none',
                'label_block' => true,
                'type' => Controls_Manager::NUMBER,
                'min' => 1,
                'max' => 3,
                'step' => 1,
                'desktop_default' => 1,
                'tablet_default' => 1,
                'mobile_default' => 3,
                'selectors' => [
                    '{{WRAPPER}} .melody-controls-primary' => 'order: {{VALUE}};',
                ],
            ],
        ],
        [
            'handle' => 'section_melody_toolbar_secondary_controls_heading',
            'config' => [
                'type' => Controls_Manager::HEADING,
                'label' => __('Secondary Controls', 'melody'),
            ],
        ],
        [
            'handle' => 'melody_toolbar_secondary_controls_width',
            'isResponsive' => true,
            'config' => [
                'label' => __('Secondary Controls Width (%)', 'melody'),
                'type' => Controls_Manager::SLIDER,
                'size_units' => ['%'],
                'range' => [
                    '%' => [
                        'min' => 0,
                        'step' => 1,
                    ],
                ],
                'devices' => ['desktop', 'tablet', 'mobile'],
                'desktop_default' => [
                    'size' => 15,
                    'unit' => '%',
                ],
                'tablet_default' => [
                    'size' => 25,
                    'unit' => '%',
                ],
                'mobile_default' => [
                    'size' => 100,
                    'unit' => '%',
                ],
                'selectors' => [
                    '{{WRAPPER}} .melody-controls-secondary' => 'flex-basis: {{SIZE}}{{UNIT}};', 
                ],
            ],
        ],
        [
            'handle' => 'melody_toolbar_secondary_controls_order',
            'isResponsive' => true,
            'config' => [
                'label' => __('Secondary Controls Order', 'melody'),
                'separator' => 'none',
                'label_block' => true,
                'type' => Controls_Manager::NUMBER,
                'min' => 1,
                'max' => 3,
                'step' => 1,
                'desktop_default' => 3,
                'tablet_default' => 3,
                'mobile_default' => 1,
                'selectors' => [
                    '{{WRAPPER}} .melody-controls-secondary' => 'order: {{VALUE}};',
                ],
            ],
        ],
        [
            'handle' => 'section_melody_toolbar_track_info_heading',
            'config' => [
                'type' => Controls_Manager::HEADING,
                'label' => __('Track Info', 'melody'),
            ],
        ],
        [
            'handle' => 'melody_toolbar_trackinfo_width',
            'isResponsive' => true,
            'config' => [
                'label' => __('Track Info Width (%)', 'melody'),
                'type' => Controls_Manager::SLIDER,
                'size_units' => ['%'],
                'range' => [
                    '%' => [
                        'min' => 0,
                        'step' => 1,
                    ],
                ],
                'devices' => ['desktop', 'tablet', 'mobile'],
                'desktop_default' => [
                    'size' => 70,
                    'unit' => '%',
                ],
                'tablet_default' => [
                    'size' => 55,
                    'unit' => '%',
                ],
                'mobile_default' => [
                    'size' => 100,
                    'unit' => '%',
                ],
                'selectors' => [
                    '{{WRAPPER}} .melody-c-trackinfo-width' => 'flex-basis: {{SIZE}}{{UNIT}};', 
                ],
            ],
        ],
        [
            'handle' => 'melody_toolbar_trackinfo_order',
            'isResponsive' => true,
            'config' => [
                'label' => __('Track Info Controls Order', 'melody'),
                'separator' => 'none',
                'label_block' => true,
                'type' => Controls_Manager::NUMBER,
                'min' => 1,
                'max' => 3,
                'step' => 1,
                'desktop_default' => 2,
                'tablet_default' => 2,
                'mobile_default' => 2,
                'selectors' => [
                    '{{WRAPPER}} .melody-c-trackinfo-order' => 'order: {{VALUE}};',
                ],
            ],
        ],
    ],
];
