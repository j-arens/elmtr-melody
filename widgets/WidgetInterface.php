<?php

namespace Melody\Widgets;

interface WidgetInterface {

    /**
     * Get widget name
     */
    public function get_name();

    /**
     * Get widget title
     */
    public function get_title();

    /**
     * Get widget icon
     */
    public function get_icon();

    /**
     * Get widget categories
     */
    public function get_categories();
}