<?php

use Elementor\Controls_Manager;
use Elementor\Group_Control_Border;
use Elementor\Group_Control_Box_Shadow;

return [
    'version' => '1.0.0',
    'handle' => 'section_melody_style',
    'config' => [
        'label' => 'Widget',
        'tab' => Controls_Manager::TAB_STYLE,
    ],
    'inputs' => [
        [
            'handle' => 'melody_component_style',
            'config' => [
                'label' => 'Style',
                'type' => Controls_Manager::SELECT,
                'label_block' => true,
                'default' => 'slider',
                'options' => [
                    'simple-toolbar' => 'Simple Toolbar',
                    'slider' => 'Slider',
                    'track-list' => 'Track List',
                ],
            ],
        ],
    ],
];