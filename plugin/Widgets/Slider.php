<?php

namespace Melody\Widgets;

use DownShift\Container\Container;

final class Slider extends AbstractMelodyWidget implements WidgetInterface {

    /**
     * @var string
     */
    protected $handle = 'melody-audio-player-slider';

    /**
     * @var string
     */
    protected $title = 'Melody Slider';

    /**
     * @var string
     */
    protected $icon = 'eicon-play';

    /**
     * @var string
     */
    protected $categories = ['melody-elements'];

    /**
     * @var string
     */
    protected $style = 'slider';
    
    /**
     * @var array[]
     */
    protected $stacks = [];

    /**
     * @var array
     */
    protected $imageSizes = [
        'melody-sm' => 320,
        'melody-md' => 768,
        'melody-lg' => 1200,
    ];

    /**
     * Constructor
     * 
     * @param array $data
     * @param mixed $args
     */
    public function __construct($data = [], $args = null) {
        parent::__construct($data, $args);
        $this->addImageSizes($this->imageSizes);
    }
    
    /**
     * {@inheritdoc}
     */
    public function get_name() {
        return $this->handle;
    }

    /**
     * {@inheritdoc}
     */
    public function get_title() {
        return sprintf(__('%1s', 'melody'), $this->title);
    }

    /**
     * {@inheritdoc}
     */
    public function get_icon() {
        return $this->icon;
    }

    /**
     * {@inheritdoc}
     */
    public function get_categories() {
        return $this->categories;
    }
    
    /**
     * {@inheritdoc}
     */
    protected function setStacks(Container $container) {
        $this->stacks = $container['stacks']['slider'];
    }
    
    /**
     * {@inheritdoc}
     */
    protected function getStacks() {
        return $this->stacks;
    }

    /**
     * {@inheritdoc}
     */
    protected function getComponentStyle() {
        return $this->style;
    }
}
