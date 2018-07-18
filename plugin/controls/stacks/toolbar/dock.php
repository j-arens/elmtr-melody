<?php

use Elementor\Controls_Manager;
use Elementor\Group_Control_Typography;

return [
    'version' => '1.0.0',
    'handle' => 'section_melody_toolbar_dock',
    'config' => [
        'label' => __('Dock', 'melody'),
        'tab' => Controls_Manager::TAB_STYLE,
    ],
    'inputs' => [
        [
            'handle' => 'section_melody_toolbar_dock_controls_heading',
            'config' => [
                'type' => Controls_Manager::HEADING,
                'label' => __('Controls', 'melody'),
                'separator' => 'before',
            ],
        ],
        [
            'handle' => 'melody_toolbar_dock_controls_primary_color',
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
            'handle' => 'melody_toolbar_dock_controls_secondary_color',
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
            'handle' => 'melody_toolbar_dock_controls_border_color',
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
        [
            'handle' => 'melody_toolbar_dock_controls_icon_color',
            'config' => [
                'label' => __('Icon Color', 'melody'),
                'type' => Controls_Manager::COLOR,
                'default' => '#fff',
                'selectors' => [
                    '{{WRAPPER}}-dock-controls-icon-color' => 'fill: {{VALUE}}',
                ],
            ],
        ],
        [
            'handle' => 'melody_toolbar_dock_controls_text_color',
            'config' => [
                'label' => __('Text Color', 'melody'),
                'type' => Controls_Manager::COLOR,
                'default' => '#fff',
                'selectors' => [
                    '{{WRAPPER}}-dock-controls-text-color' => 'color: {{VALUE}}',
                ],
            ],
        ],
        [
            'isGroup' => true,
            'handle' => Group_Control_Typography::get_type(),
            'config' => [
                'name' => 'melody_toolbar_dock_controls_font',
                'label' => __('Font Style', 'melody'),
                'selector' => '{{WRAPPER}}-dock-controls-font',
            ],
        ],
    ],
];
