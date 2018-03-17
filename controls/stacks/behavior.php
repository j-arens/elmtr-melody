<?php

use Elementor\Controls_Manager;

return [
    'version' => '1.0.0',
    'handle' => 'section_melody_behavior',
    'config' => [
        'label' => 'Behavior',
        'tab' => Controls_Manager::TAB_STYLE,
    ],
    'inputs' => [
        [
            'handle' => 'melody_behavior_sticky',
            'config' => [
                'label' => 'Sticky',
                'type' => Controls_Manager::SWITCHER,
                'label_off' => 'off',
                'label_on' => 'on',
                'default' => 'no',
            ],
        ],
        [
            'handle' => 'melody_behavior_sticky_placement',
            'config' => [
                'label' => 'Sticky Position',
                'type' => Controls_Manager::SELECT,
                'condition' => [
                    'melody_behavior_sticky' => 'yes',
                ],
                'label_block' => true,
                'default' => 'top',
                'options' => [
                    'top' => 'top',
                    'bottom' => 'bottom',
                    'custom' => 'custom',
                ],
            ],
        ],
        [
            'handle' => 'melody_behavior_sticky_help',
            'config' => [
                'raw' => 'Define a custom offset where the player will become sticky. For example: To have the player stick at the top of the page you would define an offset of 0px. The WordPress admin bar is automatically detected and compensated for, so you do not need to add it\'s height to your offset.',
                'type' => Controls_Manager::RAW_HTML,
                'content_classes' => 'elementor-descriptor',
                'condition' => [
                    'melody_behavior_sticky' => 'yes',
                    'melody_behavior_sticky_position' => 'custom',
                ],
            ],
        ],
        [
            'handle' => 'melody_behavior_sticky_offset',
            'config' => [
                'label' => 'Sticky Offset (px)',
                'type' => Controls_Manager::NUMBER,
                'min' => 0,
                'default' => 0,
                'step' => 1,
                'placeholder' => 0,
                'condition' => [
                    'melody_behavior_sticky' => 'yes',
                    'melody_behavior_sticky_position' => 'custom',
                ],
            ],
        ],
    ],
];