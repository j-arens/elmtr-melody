<?php

namespace Melody\Core;

use Melody\Controls\custom\AudioPicker;
use Melody\Widgets\Slider;
use Elementor\Plugin as ElementorPlugin;
use Elementor\Widgets_Manager;
use Elementor\Controls_Manager;

class Plugin {

    /**
     * @var AudioPicker
     */
    protected $audioPicker;

    /**
     * @var Slider
     */
    protected $slider;


    /**
     * @param AudioPicker $audioLibraryControl
     * @param Slider $slider
     */
    public function __construct(
        AudioPicker $audioPicker,
        Slider $slider
    ) {
        $this->audioPicker = $audioPicker;
        $this->slider = $slider;

        $this->registerCategory();

        add_action(
            'elementor/widgets/widgets_registered',
            [$this, 'registerWidgets']
        );

        add_action(
            'elementor/controls/controls_registered',
            [$this, 'registerControls']
        );
    }

    /**
     * Register melody elements category with Elementor
     */
    protected function registerCategory() {
        $manager = ElementorPlugin::instance()->elements_manager;
        $manager->add_category(
            'melody-elements',
            ['title' => 'Melody Audio Elements', 'icon' => 'eicon-font'],
            1
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
        $manager->register_control(
            $this->audioPicker->get_type(),
            $this->audioPicker
        );
    }
}