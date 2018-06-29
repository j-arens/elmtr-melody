<?php

use Elementor\Controls_Manager;

return [
    'version' => '1.0.0',
    'handle' => 'section_melody_toolbar_btn_style',
    'config' => [
        'label' => __('Buttons', 'melody'),
        'tab' => Controls_Manager::TAB_STYLE,
    ],
    'inputs' => [
        [
            'handle' => 'section_melody_toolbar_btns_heading_colors',
            'config' => [
                'type' => Controls_Manager::HEADING,
                'label' => __('Colors', 'melody'),
            ],
        ],
        [
            'handle' => 'melody_toolbar_btn_primary_color',
            'config' => [
                'label' => __('Primary Color', 'melody'),
                'type' => Controls_Manager::COLOR,
                'default' => '#4D4D4D',
                'selectors' => [
                    '{{WRAPPER}} .melody-c-btn-primary-color' => 'color: {{VALUE}}',
                ],
            ],
        ],
        [
            'handle' => 'melody_toolbar_btn_hover_color',
            'config' => [
                'label' => __('Hover Color', 'melody'),
                'type' => Controls_Manager::COLOR,
                'default' => '#B0AFAF',
                'separator' => 'none',
                'selectors' => [
                    '{{WRAPPER}} .melody-c-btn-hover-color:hover' => 'color: {{VALUE}}',
                ],
            ],
        ],
        [
            'handle' => 'melody_toolbar_btn_on_color',
            'config' => [
                'label' => __('Shuffle/Repeat Enabled Color', 'melody'),
                'type' => Controls_Manager::COLOR,
                'default' => '#B0AFAF',
                'separator' => 'none',
                'selectors' => [
                    '{{WRAPPER}} .melody-shuffle.melody-c-shuffle-on' => 'color: {{VALUE}}',
                    '{{WRAPPER}} .melody-repeat.melody-c-repeat-on' => 'color: {{VALUE}}',
                ],
            ],
        ],
        [
            'handle' => 'section_melody_toolbar_btns_primary',
            'config' => [
                'type' => Controls_Manager::HEADING,
                'label' => __('Primary', 'melody'),
            ],
        ],
        [
            'handle' => 'melody_toolbar_btns_primary_max_width',
            'isResponsive' => true,
            'config' => [
                'label' => __('Size', 'melody'),
                'type' => Controls_Manager::SLIDER,
                'devices' => ['desktop', 'tablet', 'mobile'],
                'desktop_default' => [
                    'size' => 25,
                    'unit' => 'px',
                ],
                'tablet_default' => [
                    'size' => 20,
                    'unit' => 'px',
                ],
                'mobile_default' => [
                    'size' => 25,
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
                    '{{WRAPPER}} .melody-controls-primary .melody-c-btn-width' => 'max-width: {{SIZE}}{{UNIT}};', 
                ],
            ],
        ],
        [
            'handle' => 'melody_toolbar_btns_primary_space',
            'isResponsive' => true,
            'config' => [
                'label' => __('Spacing', 'melody'),
                'type' => Controls_Manager::SLIDER,
                'separator' => 'none',
                'devices' => ['desktop', 'tablet', 'mobile'],
                'desktop_default' => [
                    'size' => 35,
                    'unit' => 'px',
                ],
                'tablet_default' => [
                    'size' => 25,
                    'unit' => 'px',
                ],
                'mobile_default' => [
                    'size' => 30,
                    'unit' => 'px',
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
                'selectors' => [
                    '{{WRAPPER}} .melody-controls-primary .melody-c-btn-space + .melody-c-btn-space' => 'margin-left: {{SIZE}}{{UNIT}};', 
                ],
            ],
        ],
        [
            'handle' => 'melody_toolbar_btns_primary_flex_alignment',
            'isResponsive' => true,
            'config' => [
                'label' => __('Alignment', 'melody'),
                'type' => Controls_Manager::CHOOSE,
                'separator' => 'none',
                'options' => [
                    'flex-start' => [
                        'title' => __('Left', 'melody'),
                        'icon' => 'fa fa-align-left',
                    ],
                    'center' => [
                        'title' => __('Center', 'melody'),
                        'icon' => 'fa fa-align-center',
                    ],
                    'flex-end' => [
                        'title' => __('Right', 'melody'),
                        'icon' => 'fa fa-align-right',
                    ],
                ],
                'desktop_default' => 'center',
                'tablet_default' => 'flex-start',
                'mobile_default' => 'center',
                'devices' => ['desktop', 'tablet', 'mobile'],
                'selectors' => [
                    '{{WRAPPER}} .melody-controls-primary' => 'justify-content: {{VALUE}};',
                ],
            ],
        ],
        [
            'handle' => 'section_melody_toolbar_btns_secondary',
            'config' => [
                'type' => Controls_Manager::HEADING,
                'label' => __('Secondary', 'melody'),
            ],
        ],
        [
            'handle' => 'melody_toolbar_btns_secondary_max_width',
            'isResponsive' => true,
            'config' => [
                'label' => __('Size', 'melody'),
                'type' => Controls_Manager::SLIDER,
                'devices' => ['desktop', 'tablet', 'mobile'],
                'size_units' => ['px'],
                'desktop_default' => [
                    'size' => 20,
                    'unit' => 'px',
                ],
                'tablet_default' => [
                    'size' => 18,
                    'unit' => 'px',
                ],
                'range' => [
                    'px' => [
                        'min' => 0,
                        'step' => 1,
                    ],
                ],
                'selectors' => [
                    '{{WRAPPER}} .melody-controls-secondary .melody-c-btn-width' => 'max-width: {{SIZE}}{{UNIT}};', 
                ],
            ],
        ],
        [
            'handle' => 'melody_toolbar_btns_secondary_space',
            'isResponsive' => true,
            'config' => [
                'label' => __('Spacing', 'melody'),
                'type' => Controls_Manager::SLIDER,
                'separator' => 'none',
                'size_units' => ['px', 'em', '%'],
                'devices' => ['desktop', 'tablet', 'mobile'],
                'desktop_default' => [
                    'size' => 20,
                    'unit' => 'px',
                ],
                'tablet_default' => [
                    'size' => 20,
                    'unit' => 'px',
                ],
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
                'selectors' => [
                    '{{WRAPPER}} .melody-controls-secondary .melody-c-btn-space + .melody-c-btn-space' => 'margin-left: {{SIZE}}{{UNIT}};', 
                ],
            ],
        ],
        [
            'handle' => 'melody_toolbar_btns_secondary_flex_alignment',
            'isResponsive' => true,
            'config' => [
                'label' => __('Alignment', 'melody'),
                'type' => Controls_Manager::CHOOSE,
                'separator' => 'none',
                'options' => [
                    'flex-start' => [
                        'title' => __('Left', 'melody'),
                        'icon' => 'fa fa-align-left',
                    ],
                    'center' => [
                        'title' => __('Center', 'melody'),
                        'icon' => 'fa fa-align-center',
                    ],
                    'flex-end' => [
                        'title' => __('Right', 'melody'),
                        'icon' => 'fa fa-align-right',
                    ],
                ],
                'devices' => ['desktop', 'tablet', 'mobile'],
                'desktop_default' => 'center',
                'tablet_default' => 'flex-end',
                'mobile_default' => 'center',
                'selectors' => [
                    '{{WRAPPER}} .melody-controls-secondary' => 'justify-content: {{VALUE}};',
                ],
            ],
        ],
    ],
];
