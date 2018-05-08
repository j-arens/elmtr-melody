<?php

namespace Melody\Core;

use Melody\Controls\custom\TrackPicker;
use Melody\Widgets\Slider;
use Melody\Widgets\SimpleToolbar;
use Melody\Widgets\Tracklist;
use Elementor\Widgets_Manager;
use Elementor\Controls_Manager;
use Elementor\Elements_Manager;

class Plugin {
    /**
     * @var array
     */
    protected $controls = [];

    /**
     * @var array
     */
    protected $widgets = [];

    /**
     * @param TrackPicker $trackPicker
     * @param Slider $slider
     * @param SimpleToolbar $toolbar
     * @param Tracklist $tracklist
     */
    public function __construct(
        TrackPicker $trackPicker,
        Slider $slider,
        SimpleToolbar $toolbar,
        Tracklist $tracklist
    ) {
        $this->i18n();

        array_push($this->controls,
            $trackPicker
        );

        array_push($this->widgets,
            $slider,
            $toolbar,
            $tracklist
        );

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
        foreach($this->widgets as $widget) {
            $manager->register_widget_type($widget);
        }
    }

    /**
     * Register custom controls with Elementor
     * 
     * @param Controls_Manager $manager
     */
    public function registerControls(Controls_Manager $manager) {
        foreach($this->controls as $control) {
            $manager->register_control(
                $control->get_type(),
                $control
            );
        }
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