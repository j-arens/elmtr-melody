<?php

namespace Melody\Widgets;

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
        'melody-xs' => 320,
        'melody-sm' => 480,
        'melody-md' => 768,
        'melody-lg' => 992,
        'melody-xl' => 1200,
    ];

    /**
     * Constructor
     * 
     * @param array $data
     * @param mixed $args
     */
    public function __construct($data = [], $args = null) {
        parent::__construct($data, $args);
        $this->addImageSizes();
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
        return sprintf(__('%1s', MELODY_TD), $this->title);
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

    /**
     * Add more image sizes for better responsive images
     */
    protected function addImageSizes() {
        foreach($this->imageSizes as $name => $width) {
            add_image_size($name, $width, 9999);
        }
    }
}
