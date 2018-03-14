<?php

namespace Melody\controls\custom;

interface CustomInputInterface {

    /**
     * Get the input handle
     */
    public function get_type();

    /**
     * Get input default values
     */
    public function get_default_value();

    /**
     * Get input default settings
     */
    public function get_default_settings();

    /**
     * Enqueue input assets
     */
    public function enqueue();

    /**
     * Get input view
     */
    public function content_template();
}