<?php

namespace Melody\Controls\custom;

use Melody\Core\ViewInterface;
use Melody\Enhancers\EnhancesAudioAttachments;
use function WordpressEnqueueChunksPlugin\registerScripts;
use Elementor\Control_Base_Multiple;

class TrackPicker extends Control_Base_Multiple implements CustomInputInterface {

    use EnhancesAudioAttachments;

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
     * @var ViewInterface
     */
    protected $view;

    /**
     * @param ViewInterface
     */
    public function __construct(ViewInterface $view) {
        parent::__construct();
        $this->view = $view;

        add_filter(
            'wpecp/register/controls',
            [$this, 'addWpDeps']
        );

        add_filter(
            'wp_prepare_attachment_for_js',
            [$this, 'addArtworkId'], 10, 2
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
     * Adds wp script dependencies to controls js
     * 
     * @param array $scriptArgs
     * @return array
     */
    public function addWpDeps(array $args) {
        array_push($args['deps'], 'media-editor', 'media-audiovideo');
        return $args;
    }

    /**
     * Enqueue input assets
     */
    public function enqueue() {
        wp_enqueue_media();
        wp_enqueue_style('media', admin_url('/css/media.min.css'));
        registerScripts(['controls']);
        wp_enqueue_script('melody-js-controls');
    }

    /**
     * Get input view
     */
    public function content_template() {
        $this->view->render(MELODY_PLUGIN_DIR . '/templates/track-picker.php');
    }
}
