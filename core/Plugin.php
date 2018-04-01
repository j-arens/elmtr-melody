<?php

namespace Melody\Core;

use Downshift\Container\Container;
use Melody\Widgets\MelodyWidgetBlueprint;
use Melody\Controls\custom\AudioPicker;
use Elementor\Plugin as ElementorPlugin;
use Elementor\Widgets_Manager;
use Elementor\Controls_Manager;

class Plugin {

    /**
     * @var Container
     */
    protected $container;

    /**
     * @var AudioPicker
     */
    protected $audioPicker;

    /**
     * @param AudioPicker $audioLibraryControl
     */
    public function __construct(AudioPicker $audioPicker) {
        $this->audioPicker = $audioPicker;
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
     * Set the container instance
     * 
     * @param Container $container
     */
    protected function setContainer(Container $container) {
        $this->container = $container;
    }

    /**
     * Reguster melody elements category with Elementor
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
     */
    public function registerWidgets(Widgets_Manager $manager) {
        $widgets = $this->container['widgetConfigs'];
        foreach($widgets as $widget) {
            $manager->register_widget(
                new MelodyWidgetBlueprint(
                    $this->container,
                    $widget
                )
            );
        }
    }

    /**
     * Register custom controls with Elementor
     */
    public function registerControls(Controls_Manager $manager) {
        $manager->register_control(
            $this->audioPicker->get_type(),
            $this->audioPicker
        );
    }
}