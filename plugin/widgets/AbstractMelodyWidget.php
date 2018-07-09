<?php

namespace Melody\Widgets;

use DownShift\Container\Container;
use WordPressChunkLoaderPlugin as wpcl;
use Melody\Enhancers\EnhancesImageAttachments;
use Elementor\Widget_Base;

abstract class AbstractMelodyWidget extends Widget_Base {

    use EnhancesImageAttachments;

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
    }

    /**
     * Can't use dependency injection in classes that extend Widget_Base,
     * so we're using our own pretend constructor to set things up
     */
    protected function initialize() {
        $container = Container::getInstance();
        $this->view = $container->make('Melody\Core\ViewInterface');
        $this->setStacks($container);
        add_action('elementor/frontend/after_enqueue_scripts', [$this, 'enqueueApp']);
    }
    
    /**
     * Set widget control stacks
     */
    abstract protected function setStacks(Container $container);
    
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
        // Somewhere along the line elementor does some weird stuff
        // and we loose reference to our stacks, getting and setting
        // stacks in the final widget class would solve this problem
        if (empty($this->getStacks())) {
            $this->setStacks(Container::getInstance());
        }
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
     * Enqueue app styles & scripts
     */
    public function enqueueApp() {
        wp_enqueue_style(
            'melody-app-style',
            plugins_url('public/css/melody.min.css', MELODY_ROOT),
            null,
            filemtime(MELODY_BASE_DIR . '/public/css/melody.min.css'),
            'all'
        );

        wpcl\processManifest();

        wp_localize_script('melody-js-adapter', 'MELODY_ENV', [
            'pluginsUrl' => plugins_url(),
            'siteUrl' => get_site_url(),
        ]);

        wp_enqueue_script('melody-js-adapter');
        wp_enqueue_script('melody-js-melody');
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
