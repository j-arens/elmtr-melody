<?php

namespace Melody\Core;

use Melody\Widgets\Melody;
use Melody\Controls\custom\AudioPicker;
use Elementor\Widgets_Manager;
use Elementor\Controls_Manager;

class Plugin {

    /**
     * @var Melody
     */
    protected $melodyWidget;

    /**
     * @var AudioPicker
     */
    protected $audioPicker;

    /**
     * @param Melody $melodyWidget
     * @param AudioPicker $audioLibraryControl
     */
    public function __construct(
        Melody $melodyWidget,
        AudioPicker $audioPicker
    ) {
        $this->melodyWidget = $melodyWidget;
        $this->audioPicker = $audioPicker;

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
     * Register custom widgets with Elementor
     */
    public function registerWidgets(Widgets_Manager $manager) {
        $manager->register_widget_type($this->melodyWidget);
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