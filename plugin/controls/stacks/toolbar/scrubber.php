<?php

use Elementor\Controls_Manager;

return [
    'version' => '1.0.0',
    'handle' => 'section_toolbar_scrubber_style',
    'config' => [
        'label' => __('Scrubber', 'melody'),
        'tab' => Controls_Manager::TAB_STYLE,
    ],
    'inputs' => [
        [
            'handle' => 'melody_toolbar_scrubber_primary_color',
            'config' => [
                'label' => __('Primary Color', 'melody'),
                'type' => Controls_Manager::COLOR,
                'default' => '#B0AFAF',
                'selectors' => [
                    '{{WRAPPER}} .melody-c-scrubber-body-bg-color' => 'background-color: {{VALUE}}',
                ],
            ],
        ],
        [
            'handle' => 'melody_toolbar_scrubber_secondary_color',
            'config' => [
                'label' => __('Background Color', 'melody'),
                'type' => Controls_Manager::COLOR,
                'default' => '#252525',
                'selectors' => [
                    '{{WRAPPER}} .melody-c-scrubber-backfill-bg-color' => 'background-color: {{VALUE}}',
                ],
            ],
        ],
        [
            'handle' => 'melody_toolbar_scrubber_handle_color',
            'config' => [
                'label' => __('Handle Color', 'melody'),
                'type' => Controls_Manager::COLOR,
                'default' => '#fff',
                'selectors' => [
                    '{{WRAPPER}} .melody-c-scrubber-handle-bg-color' => 'background-color: {{VALUE}}',
                ],
            ],
        ],
    ],
];
