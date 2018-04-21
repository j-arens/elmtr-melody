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
    protected $defaultValues = [
        'id' => 0,
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

        add_filter(
            'wp_prepare_attachment_for_js',
            [$this, 'enhanceAsyncAudioUpload'], 10, 2
        );
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
     * Checks if the given attachment is an audio post
     * 
     * @param mixed $attachment
     * @return boolean
     */
    protected function isAudioAttachment($attachment) {
        if (!$attachment instanceof \WP_Post) {
            return false;
        }

        if ($attachment->post_type !== 'attachment') {
            return false;
        }

        if (substr($attachment->post_mime_type, 0, 5) !== 'audio') {
            return false;
        }

        return true;
    }

    /**
     * Enhances async audio uploads with the attached featured image id
     * 
     * @param array $res
     * @param mixed $attachment
     * @return array
     */
    public function enhanceAsyncAudioUpload(array $res, $attachment) {
        if (!$this->isAudioAttachment($attachment)) {
            return $res;
        }

        $res['image']['id'] = get_post_thumbnail_id($attachment);
        return $res;
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
        
        wp_register_script(
            'melody-controls-js',
            plugins_url('public/js/controls.bundle.js', MELODY_ROOT),
            ['media-editor', 'media-audiovideo'],
            filemtime(MELODY_BASE_DIR . '/public/js/controls.bundle.js'),
            true
        );

        wp_enqueue_script('melody-controls-js');
    }

    /**
     * Get input view
     */
    public function content_template() {
        $this->view->render(MELODY_PLUGIN_DIR . '/templates/track-picker.php');
    }
}