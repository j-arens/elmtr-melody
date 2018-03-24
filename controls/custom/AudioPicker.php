<?php

namespace Melody\Controls\custom;

use Melody\Core\ViewInterface;
use Elementor\Control_Base_Multiple;

// @TODO: implement on_import func?

class AudioPicker extends Control_Base_Multiple implements CustomInputInterface {

    /**
     * @var string
     */
    protected $handle = 'melody-audio-picker';

    /**
     * @var array
     */
    protected $defaultValues = [
        'id' => '',
        'title' => '',
        'album' => '',
        'artist' => '',
        'artwork' => '',
        'duration' => '',
    ];

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
            plugins_url('assets/js/audioPicker.bundle.js', STELE_MELODY_ROOT),
            ['media-editor', 'media-audiovideo'],
            filemtime(STELE_MELODY_DIR . '/assets/js/audioPicker.bundle.js'),
            true
        );
    }

    /**
     * Get input view
     */
    public function content_template() {
        $this->view->render(STELE_MELODY_DIR . '/templates/audioPicker.php');
    }
}