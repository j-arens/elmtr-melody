<?php

use Elementor\Controls_Manager;

return [
    'version' => '1.0.0',
    'handle' => 'section_melody_btn_style',
    'config' => [
        'label' => 'Buttons',
        'tab' => Controls_Manager::TAB_STYLE,
    ],
    'inputs' => [
        [
            'handle' => 'melody_btn_primary_color',
            'config' => [
                'label' => 'Primary Color',
			    'type' => Controls_Manager::COLOR,
            ],
        ],
        [
            'handle' => 'melody_btn_hover_color',
            'config' => [
                'label' => 'Hover Color',
			    'type' => Controls_Manager::COLOR,
            ],
        ],
        [
            'handle' => 'melody_btn_on_color',
            'config' => [
                'label' => 'Shuffle & Repeat Activated Color',
                'type' => Controls_Manager::COLOR,
            ],
        ],
        [
            'handle' => 'melody_btn_space',
            'config' => [
                'label' => 'Spacing',
                'type' => Controls_Manager::SLIDER,
                'default' => [
                    'size' => '30',
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
                    '{{WRAPPER}} [data-melody-control-bar] button + button' => 'margin-left: {{SIZE}}{{UNIT}};', 
                ],
            ],
        ],
        [
            'handle' => 'melody_btn_flex_alignment',
            'config' => [
                'label' => 'Alignment',
                'type' => Controls_Manager::CHOOSE,
                'options' => [
                    'flex-start' => [
                        'title' => 'Left',
                        'icon' => 'fa fa-align-left',
                    ],
                    'center' => [
                        'title' => 'Center',
                        'icon' => 'fa fa-align-center',
                    ],
                    'flex-end' => [
                        'title' => 'Right',
                        'icon' => 'fa fa-align-right',
                    ],
                ],
                'default' => 'center',
                'selectors' => [
                    '{{WRAPPER}} [data-melody-control-bar]' => 'justify-content: {{VALUE}};',
                ],
            ],
        ],
        [
            'handle' => 'melody_btn_max_width',
            'config' => [
                'label' => 'Size',
                'type' => Controls_Manager::SLIDER,
                'default' => [
                    'size' => 30,
                    'unit' => 'px',
                ],
                'size_units' => ['px'],
                'range' => [
                    '%' => [
                        'min' => 0,
                        'step' => 1,
                    ],
                ],
                'selectors' => [
                    '{{WRAPPER}} [data-melody-control-bar] .melody-playbackCtrl' => 'max-width: {{SIZE}}{{UNIT}};', 
                ],
            ],
        ],
    ],
];