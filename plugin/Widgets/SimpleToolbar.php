<?php

namespace Melody\Widgets;

use DownShift\Container\Container;

final class SimpleToolbar extends AbstractMelodyWidget implements WidgetInterface {

    /**
     * @var string
     */
    protected $handle = 'melody-audio-player-toolbar';

    /**
     * @var string
     */
    protected $title = 'Melody Toolbar';

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
    protected $style = 'simple-toolbar';
    
    /**
     * @var array[]
     */
    protected $stacks = [];
    
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
        $this->stacks = $container['stacks']['toolbar'];
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
