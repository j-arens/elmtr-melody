<?php

namespace Melody\Widgets;

use DownShift\Container\Container;
use Melody\Core\EnhancesArtworkAttachments;
use Elementor\Widget_Base;

abstract class AbstractMelodyWidget extends Widget_Base {

    use EnhancesArtworkAttachments;

    /**
     * @var Container
     */
    protected $container;

    /**
     * @var ViewInterface
     */
    protected $view;

    /**
     * Constructor
     * 
     * @param array $data
     * @param mixed $args
     */
    public function __construct($data = [], $args = null) {
        parent::__construct($data, $args);
        $this->initialize();
        add_action('elementor/frontend/after_enqueue_scripts', [$this, 'enqueueApp']);
    }

    /**
     * Can't use dependency injection in classes that extend widget_base,
     * so we're using our own pretend constructor to set things up
     */
    protected function initialize() {
        $this->container = Container::getInstance();
        $this->view = $this->container->make('Melody\Core\ViewInterface');
        $this->setStacks($this->container);
    }
    
    /**
     * Set widget control stacks
     */
    abstract protected function setStacks();
    
    /**
     * Get widget control stacks
     */
    abstract protected function getStacks();

    /**
     * Get melody widget component style
     */
    abstract protected function getComponentStyle();

    /**
     * Register controls with Elementor
     */
    protected function _register_controls() {
        foreach($this->getStacks() as $stack) {
            $this->start_controls_section(
                $stack['handle'],
                $stack['config']
            );

            foreach($stack['inputs'] as $input) {
                switch (true) {
                    case (isset($input['isGroup']) && $input['isGroup']): {
                        $this->add_group_control(
                            $input['handle'],
                            $input['config']
                        );
                        break;
                    }
                    case (isset($input['isResponsive']) && $input['isResponsive']): {
                        $this->add_responsive_control(
                            $input['handle'],
                            $input['config']
                        );
                        break;
                    }
                    default: {
                        $this->add_control(
                            $input['handle'],
                            $input['config']
                        );
                        break;
                    }
                }
            }

            $this->end_controls_section();
        }
    }

    /**
     * Enqueue Melody styles & scripts
     */
    public function enqueueApp() {
        // $manifest = $this->container['manifest'];

        // foreach($manifest as $script => $path) {
        //     wp_enqueue_script(
        //         "melody-$script",
        //         plugins_url($path, MELODY_ROOT),
        //     );
        // }

        wp_enqueue_style(
            'melody-app-style',
            plugins_url('public/css/melody.min.css', MELODY_ROOT),
            null,
            filemtime(MELODY_BASE_DIR . '/public/css/melody.min.css'),
            'all'
        );

        wp_enqueue_script(
            'vendors-melody-adapter',
            plugins_url('public/js/vendors~adapter~melody.bundle.js', MELODY_ROOT),
            null,
            filemtime(MELODY_BASE_DIR . '/public/js/vendors~adapter~melody.bundle.js'),
            true
        );

        wp_enqueue_script(
            'vendors-adapter',
            plugins_url('public/js/vendors~adapter.bundle.js', MELODY_ROOT),
            null,
            filemtime(MELODY_BASE_DIR . '/public/js/vendors~adapter.bundle.js'),
            true
        );

        wp_enqueue_script(
            'vendors-controls',
            plugins_url('public/js/vendors~controls.bundle.js', MELODY_ROOT),
            null,
            filemtime(MELODY_BASE_DIR . '/public/js/vendors-controls.bundle.js'),
            true
        );
        
        wp_enqueue_script(
            'melody-app-js',
            plugins_Url('public/js/melody.bundle.js', MELODY_ROOT),
            null,
            filemtime(MELODY_BASE_DIR . '/public/js/melody.bundle.js'),
            true
        );

        wp_register_script(
            'melody-adapter-js',
            plugins_url('public/js/adapter.bundle.js', MELODY_ROOT),
            ['elementor-frontend', 'melody-app-js'],
            filemtime(MELODY_BASE_DIR . '/public/js/adapter.bundle.js'),
            true
        );

        wp_localize_script('melody-adapter-js', 'MELODY_ENV', [
            'pluginsUrl' => plugins_url(),
            'siteUrl' => get_site_url(),
        ]);

        wp_enqueue_script('melody-adapter-js');
    }

    /**
     * Supplement widget data
     * 
     * @return array
     */
    protected function prepareData() {
        $data = $this->get_raw_data();
        $data = $this->addAttachmentSizes($data);
        $data['settings']['melody_component_style'] = $this->getComponentStyle();
        return $data;
    }

    /**
     * Render widget template
     */
    protected function render() {
        $data = $this->prepareData();
        $this->view->render(MELODY_PLUGIN_DIR . '/templates/widget-root.php', [
            'settings' => $data['settings'],
            'instance' => $data['id'],
        ]);
    }
}
