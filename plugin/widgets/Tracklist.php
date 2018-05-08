<?php

namespace Melody\Widgets;

use DownShift\Container\Container;

final class Tracklist extends AbstractMelodyWidget implements WidgetInterface {

    /**
     * @var string
     */
    protected $handle = 'melody-audio-player-tracklist';

    /**
     * @var string
     */
    protected $title = 'Melody Tracklist';

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
    protected $style = 'tracklist';
    
    /**
     * @var array[]
     */
    protected $stacks = [];
    
    /**
     * @var ViewInterface
     */
    protected $view;
    
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
    protected function setView() {
        $container = Container::getInstance();
        $this->view = $container->make('Melody\Core\ViewInterface');
    }
    
    /**
     * {@inheritdoc}
     */
    protected function getView() {
        return $this->view;
    }
    
    /**
     * {@inheritdoc}
     */
    protected function setStacks() {
        $container = Container::getInstance();
        $this->stacks = $container['stacks']['tracklist'];
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
