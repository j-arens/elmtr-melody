<?php

namespace Melody\Widgets;

use DownShift\Container\Container;
use Melody\Core\EnhancesArtworkAttachments;
use Elementor\Widget_Base;

abstract class AbstractMelodyWidget extends Widget_Base {

    use EnhancesArtworkAttachments;

    /**
     * Constructor
     * 
     * @param array $data
     * @param mixed $args
     */
    public function __construct($data = [], $args = null) {
        $this->setView();
        $this->setStacks();
        parent::__construct($data, $args);
        add_action('elementor/frontend/after_enqueue_scripts', [$this, 'enqueueApp']);
    }
    
    /**
     * Set the view implementation
     */
    abstract protected function setView();
    
    /**
     * Get the view implementation
     */
    abstract protected function getView();
    
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
            plugins_url('public/css/melody.min.css', MELODY_ROOT),
            null,
            filemtime(MELODY_BASE_DIR . '/public/css/melody.min.css'),
            'all'
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
     * Render widget template
     */
    protected function render() {
        $view = $this->getView();
        $data = $this->addAttachmentSizes($this->get_raw_data());
        $data['settings']['melody_component_style'] = $this->getComponentStyle();
        $this->view->render(MELODY_PLUGIN_DIR . '/templates/widget-root.php', [
            'settings' => $data['settings'],
            'instance' => $data['id'],
        ]);
    }
}