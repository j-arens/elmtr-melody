<?php

namespace Melody\Controls\custom;

use Melody\Core\ViewInterface;
use Elementor\Control_Base_Multiple;

class TrackPicker extends Control_Base_Multiple implements CustomInputInterface {

    /**
     * @var string
     */
    protected $handle = 'melody-track-picker';

    /**
     * @var array
     */
    protected $defaultValues = [];

    /**
     * @var array
     */
    protected $defaultSettings = [
        'label_block' => true,
    ];

    /**
     * @var View
     */
    protected $view;

    /**
     * @param ViewInterface
     */
    public function __construct(ViewInterface $view) {
        parent::__construct();
        $this->view = $view;
    }

    /**
     * Get the input handle
     * 
     * @return string
     */
    public function get_type() {
        return $this->handle;
    }

    /**
     * Get input default values
     * 
     * @return array
     */
    public function get_default_value() {
        return $this->defaultValues;
    }

    /**
     * Get input default settings
     * 
     * @return array
     */
    public function get_default_settings() {
        return $this->defaultSettings;
    }

    /**
     * Enqueue input assets
     */
    public function enqueue() {
        wp_enqueue_media();
        
        wp_enqueue_style(
            'media',
            admin_url('/css/media.min.css')
        );
        
        wp_enqueue_script(
            $this->handle,
            plugins_url('public/js/controls.bundle.js', MELODY_ROOT),
            ['media-editor', 'media-audiovideo'],
            filemtime(MELODY_BASE_DIR . '/public/js/controls.bundle.js'),
            true
        );
    }

    /**
     * Get input view
     */
    public function content_template() {
        $this->view->render(MELODY_PLUGIN_DIR . '/templates/track-picker.php');
    }
}