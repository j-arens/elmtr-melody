<?php

use Elementor\Controls_Manager;
use Elementor\Group_Control_Typography;
use Elementor\Group_Control_Text_Shadow;
use Elementor\Scheme_Typography;

return [
    'version' => '1.0.0',
    'handle' => 'section_melody_typography',
    'config' => [
        'label' => __('Typography'),
        'tab' => Controls_Manager::TAB_STYLE,
    ],
    'inputs' => [
        [
            'handle' => 'section_melody_toolbar_typography_title_artist',
            'config' => [
                'type' => Controls_Manager::HEADING,
                'label' => __('Track Title & Artist'),
            ],
        ],
        [
            'isGroup' => true,
            'handle' => Group_Control_Typography::get_type(),
            'config' => [
                'name' => 'melody_toolbar_title',
                'label' => __('Font Style'),
                'selector' => '{{WRAPPER}} .melody-c-title-font, {{WRAPPER}} .melody-c-artist-font',
            ],
        ],
        [
            'isGroup' => true,
            'handle' => Group_Control_Text_Shadow::get_type(),
            'config' => [
                'name' => 'melody_toolbar_title_text_shadow!melody-no-separator',
                'label' => __('Shadow'),
                'selector' => '{{WRAPPER}} .melody-c-title-shadow, {{WRAPPER}} .melody-c-artist-shadow',
                // 'separator' => 'none', no separator options exposed for text shadow group control
            ],
        ],
        [
            'handle' => 'melody_toolbar_title_color',
            'config' => [
                'label' => __('Color'),
                'type' => Controls_Manager::COLOR,
                'default' => '#fff',
                'separator' => 'none',
                'selectors' => [
                    '{{WRAPPER}} .melody-c-title-color, {{WRAPPER}} .melody-c-artist-color' => 'color: {{VALUE}}',
                ],
            ],
        ],
        [
            'handle' => 'section_melody_toolbar_typography_time',
            'config' => [
                'type' => Controls_Manager::HEADING,
                'label' => __('Time'),
            ],
        ],
        [
            'isGroup' => true,
            'handle' => Group_Control_Typography::get_type(),
            'config' => [
                'name' => 'melody_toolbar_time',
                'label' => __('Font Style'),
                'selector' => '{{WRAPPER}} .melody-c-time-font',
            ],
        ],
        [
            'isGroup' => true,
            'handle' => Group_Control_Text_Shadow::get_type(),
            'config' => [
                'name' => 'melody_toolbar_time_text_shadow!melody-no-separator',
                'label' => __('Shadow'),
                'selector' => '{{WRAPPER}} .melody-c-time-shadow',
                // 'separator' => 'none', no separator options exposed for text shadow group control
            ],
        ],
        [
            'handle' => 'melody_toolbar_time_color',
            'config' => [
                'label' => __('Color'),
                'type' => Controls_Manager::COLOR,
                'default' => '#fff',
                'separator' => 'none',
                'selectors' => [
                    '{{WRAPPER}} .melody-c-time-color' => 'color: {{VALUE}}',
                ],
            ],
        ],
        [
            'handle' => 'section_melody_toolbar_typography_title_separator',
            'config' => [
                'type' => Controls_Manager::HEADING,
                'label' => __('Separator'),
            ],
        ],
        [
            'handle' => 'section_melody_toolbar_typography_separator_text',
            'config' => [
                'type' => Controls_Manager::TEXT,
                'label' => __('Text'),
                'default' => '-',
                'placeholder' => '-',
                'label_block' => true,
                'selectors' => [
                    '{{WRAPPER}} .melody-c-separator::after' => 'content: "{{VALUE}}"',
                ],
            ],
        ],
        [
            'isGroup' => true,
            'handle' => Group_Control_Typography::get_type(),
            'config' => [
                'name' => 'melody_toolbar_separator_font!melody-no-separator',
                'label' => __('Font Style'),
                'selector' => '{{WRAPPER}} .melody-c-separator::after',
            ],
        ],
        [
            'handle' => 'melody_toolbar_separator_color',
            'config' => [
                'label' => __('Color'),
                'type' => Controls_Manager::COLOR,
                'default' => '#fff',
                'separator' => 'none',
                'selectors' => [
                    '{{WRAPPER}} .melody-c-separator::after' => 'color: {{VALUE}}',
                ],
            ],
        ],
        [
            'handle' => 'melody_toolbar_typography_separator_spacing',
            'config' => [
                'label' => __('Spacing'),
                'type' => Controls_Manager::SLIDER,
                'default' => [
                    'size' => 4,
                    'unit' => 'px',
                ],
                'separator' => 'none',
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
                    '{{WRAPPER}} .melody-c-separator' => 'margin: 0 {{SIZE}}{{UNIT}};', 
                ],
            ],
        ],
    ],
];
