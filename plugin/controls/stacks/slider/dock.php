<?php

use Elementor\Controls_Manager;

return [
    'version' => '1.0.0',
    'handle' => 'section_melody_slider_dock',
    'config' => [
        'label' => __('Dock', 'melody'),
        'tab' => Controls_Manager::TAB_STYLE,
    ],
    'inputs' => [
        [
            'handle' => 'section_melody_slider_dock_toggle_heading',
            'config' => [
                'type' => Controls_Manager::HEADING,
                'label' => __('Toggle', 'melody'),
            ],
        ],
        [
            'handle' => 'melody_slider_dock_toggle_primary_color',
            'config' => [
                'label' => __('Toggle Color', 'melody'),
                'type' => Controls_Manager::COLOR,
                'default' => '#fff',
                'separator' => 'before',
                'selectors' => [
                    '{{WRAPPER}} .melody-c-dock-toggle-color' => 'color: {{VALUE}}'
                ],
            ],
        ],
        [
            'handle' => 'melody_slider_dock_toggle_max_width',
            'config' => [
                'label' => __('Toggle Size', 'melody'),
                'type' => Controls_Manager::SLIDER,
                'default' => [
                    'size' => 20,
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
                    '{{WRAPPER}} .melody-c-dock-toggle-size' => 'max-width: {{SIZE}}{{UNIT}}; max-height: {{SIZE}}{{UNIT}};', 
                ],
            ],
        ],
        [
            'handle' => 'section_melody_slider_dock_controls_heading',
            'config' => [
                'type' => Controls_Manager::HEADING,
                'label' => __('Controls', 'melody'),
                'separator' => 'before',
            ],
        ],
        [
            'handle' => 'melody_slider_dock_controls_primary_color',
            'config' => [
                'label' => __('Primary Color', 'melody'),
                'type' => Controls_Manager::COLOR,
                'default' => '#252525',
                'separator' => 'before',
                'selectors' => [
                    '{{WRAPPER}}-dock-controls-primary-color' => 'background-color: {{VALUE}}',
                    '{{WRAPPER}}-dock-controls-arrow-color' => 'background-color: {{VALUE}}',
                ],
            ],
        ],
        [
            'handle' => 'melody_slider_dock_controls_secondary_color',
            'config' => [
                'label' => __('Secondary Color', 'melody'),
                'type' => Controls_Manager::COLOR,
                'default' => '#4D4D4D',
                'selectors' => [
                    '{{WRAPPER}}-dock-controls-secondary-color::before' => 'background-color: {{VALUE}}',
                ],
            ],
        ],
        [
            'handle' => 'melody_slider_dock_controls_border_color',
            'config' => [
                'label' => __('Border Color', 'melody'),
                'type' => Controls_Manager::COLOR,
                'default' => '#000',
                'selectors' => [
                    '{{WRAPPER}}-dock-controls-border-color' => 'border-color: {{VALUE}}',
                    '{{WRAPPER}}-dock-controls-border-color button + button' => 'border-top-color: {{VALUE}}',
                ],
            ],
        ],
    ],
];
