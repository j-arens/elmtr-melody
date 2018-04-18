<?php

namespace Melody\Core;

use Melody\Controls\custom\TrackPicker;
use Melody\Controls\custom\AudioPicker;
use Melody\Widgets\Slider;
use Elementor\Widgets_Manager;
use Elementor\Controls_Manager;
use Elementor\Elements_Manager;

class Plugin {
    /**
     * @var TrackPicker
     */
    protected $trackPicker;

    /**
     * @var AudioPicker
     */
    protected $audioPicker;

    /**
     * @var Slider
     */
    protected $slider;

    /**
     * @param TrackPicker $trackPicker
     * @param AudioPicker $audioPicker
     * @param Slider $slider
     */
    public function __construct(
        TrackPicker $trackPicker,
        AudioPicker $audioPicker,
        Slider $slider
    ) {
        $this->trackPicker = $trackPicker;
        $this->audioPicker = $audioPicker;
        $this->slider = $slider;

        $this->i18n();

        add_action(
            'elementor/elements/categories_registered',
            [$this, 'registerCategory']
        );

        add_action(
            'elementor/widgets/widgets_registered',
            [$this, 'registerWidgets']
        );

        add_action(
            'elementor/controls/controls_registered',
            [$this, 'registerControls']
        );

        add_action(
            'elementor/editor/after_enqueue_styles',
            [$this, 'overrideEditorStyles']
        );
    }

    /**
     * Register melody elements category with Elementor
     * 
     * @param Elements_Manager $manager
     */
    public function registerCategory(Elements_Manager $manager) {
        $manager->add_category(
            'melody-elements',
            ['title' => __('Melody Audio Elements', MELODY_TD), 'icon' => 'eicon-font']
        );
    }

    /**
     * Register custom widgets with Elementor
     * 
     * @param Widgets_Manager $manager
     */
    public function registerWidgets(Widgets_Manager $manager) {
        $manager->register_widget_type($this->slider);
        // $manager->register_widget_type(new Toolbar);
        // $manager->register_widget_type(new Tracklist);
    }

    /**
     * Register custom controls with Elementor
     * 
     * @param Controls_Manager $manager
     */
    public function registerControls(Controls_Manager $manager) {
        // $manager->register_control(
        //     $this->audioPicker->get_type(),
        //     $this->audioPicker
        // );
        $manager->register_control(
            $this->trackPicker->get_type(),
            $this->trackPicker
        );
    }

    /**
     * Override/supplement Elementor editor styles
     */
    public function overrideEditorStyles() {
        $style = '
            div[class*="elementor-control-melody_title_text_shadow"]::before,
            div[class*="elementor-control-melody_artist_text_shadow"]::before,
            div[class*="elementor-control-melody_time_text_shadow"]::before {
                display: none !important;
            }
        ';
        wp_styles()->add_inline_style('elementor-editor', $style);
    }

    /**
     * Load plugin text domain for translation
     */
    protected function i18n() {
        load_plugin_textdomain(MELODY_TD, false, MELODY_ROOT . '/languages/');
    }
}