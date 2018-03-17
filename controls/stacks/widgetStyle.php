<?php

use Elementor\Controls_Manager;

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
                'default' => 'skinny-bar',
                'options' => [
                    'skinny-bar' => 'Skinny Bar',
                    'medium-bar' => 'Medium Bar',
                    'full-single' => 'Full Single',
                    'full-list' => 'Full List',
                ],
            ],
        ],
    ],
];