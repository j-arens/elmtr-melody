<?php

namespace Melody\Widgets;

use DownShift\Container\Container;
use Elementor\Widget_Base;

class Melody extends Widget_Base implements WidgetInterface {

    /**
     * @var string
     */
    protected $handle = 'melody-audio-player';

    /**
     * @var string
     */
    protected $title = 'Melody Audio Player';

    /**
     * @var string
     */
    protected $icon = 'eicon-play';

    /**
     * @var string
     */
    protected $categories = ['general-elements'];

    /**
     * @var ViewInterface
     */
    protected $view;

    /**
     * @var array[]
     */
    protected $stacks = [];

    /**
     * @var number
     */
    protected static $instances = 0;

    /**
     * Constructor
     * 
     * @param array $data
     * @param mixed $args
     */
    public function __construct($data = [], $args = null) {
        parent::__construct($data, $args);
        $this->injectDependencies();
        add_action('elementor/frontend/after_enqueue_scripts', [$this, 'enqueueApp']);
    }

    /**
     * Elementor doesn't support dynamic dependency
     * injection of classes that extend Widget_Base
     * in the constructor, so we do it here
     */
    protected function injectDependencies() {
        $container = Container::getInstance();
        $this->view = $container->make('Melody\Core\ViewInterface');
        $this->stacks = $container['melodyControlStacks'];
    }
    
    /**
     * Get widget name
     * 
     * @return string
     */
    public function get_name() {
        return $this->handle;
    }

    /**
     * Get widget title
     * 
     * @return string
     */
    public function get_title() {
        return $this->title;
    }

    /**
     * Get widget icon
     * 
     * @return string
     */
    public function get_icon() {
        return $this->icon;
    }

    /**
     * Get widget categories
     * 
     * @return array
     */
    public function get_categories() {
        return $this->categories;
    }

    /**
     * Register controls with Elementor
     */
    protected function _register_controls() {
        if (empty($this->stacks)) {
            $this->injectDependencies();
        }

        foreach($this->stacks as $stack) {
            $this->start_controls_section(
                $stack['handle'],
                $stack['config']
            );

            foreach($stack['inputs'] as $input) {
                if (isset($input['isGroup']) && $input['isGroup']) {
                    $this->add_group_control(
                        $input['handle'],
                        $input['config']
                    );
                } else {
                    $this->add_control(
                        $input['handle'],
                        $input['config']
                    );
                }
            }

            $this->end_controls_section();
        }
    }

    /**
     * Enqueue Melody styles & scripts
     */
    public function enqueueApp() {
        wp_enqueue_style(
            'melody-app-style',
            plugins_url('temp-melody-js/style.css', STELE_MELODY_ROOT),
            null,
            filemtime(STELE_MELODY_DIR . '/temp-melody-js/style.css'),
            'all'
        );
        
        wp_enqueue_script(
            'melody-app-js',
            plugins_url('temp-melody-js/melody.bundle.js', STELE_MELODY_ROOT),
            null,
            filemtime(STELE_MELODY_DIR . '/temp-melody-js/melody.bundle.js'),
            true
        );

        wp_register_script(
            'melody-adapter-js',
            plugins_url('assets/js/adapter.bundle.js', STELE_MELODY_ROOT),
            ['elementor-frontend', 'melody-app-js'],
            filemtime(STELE_MELODY_DIR . '/assets/js/adapter.bundle.js'),
            true
        );

        wp_localize_script('melody-adapter-js', 'MELODY_ENV', [
            'pluginsUrl' => plugins_url(),
            'siteUrl' => get_site_url(),
        ]);

        wp_enqueue_script('melody-adapter-js');
    }

    /**
     * Render widget template
     */
    protected function render() {
        ++static::$instances;
        $this->view->render(STELE_MELODY_DIR . '/templates/melodyRoot.php', [
            'settings' => $this->get_settings(),
            'instance' => static::$instances,
        ]);
    }
}