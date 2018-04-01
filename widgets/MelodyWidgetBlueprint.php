<?php

namespace Melody\Widgets;

use DownShift\Container\Container;
use Elementor\Widget_Base;

class MelodyWidgetBlueprint extends Widget_Base implements WidgetInterface {

    /**
     * @var ViewInterface
     */
    protected $view;

    /**
     * @var array
     */
    protected $config;

    /**
     * @var array[]
     */
    protected $stacks = [];

    /**
     * Constructor
     * 
     * @param Container $container
     * @param array $config
     */
    public function __construct(
        Container $container,
        array $config
    ) {
        parent::__construct([], null);
        $this->config = $config;
        $this->view = $container->make('Melody\Core\ViewInterface');
        $this->stack = $container[$this->config['stack']];
        add_action('elementor/frontend/after_enqueue_scripts', [$this, 'enqueueApp']);
    }
    
    /**
     * Get widget name
     * 
     * @return string
     */
    public function get_name() {
        return $this->config['melody_handle'];
    }

    /**
     * Get widget title
     * 
     * @return string
     */
    public function get_title() {
        return $this->config['melody_title'];
    }

    /**
     * Get widget icon
     * 
     * @return string
     */
    public function get_icon() {
        return $this->config['melody_icon'];
    }

    /**
     * Get widget categories
     * 
     * @return array
     */
    public function get_categories() {
        return $this->config['melody_categories'];
    }

    /**
     * Register controls with Elementor
     */
    protected function _register_controls() {
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
        $data = $this->get_raw_data();
        $this->view->render(STELE_MELODY_DIR . '/templates/widget-root.php', [
            'settings' => $data['settings'],
            'instance' => $data['id'],
        ]);
    }
}