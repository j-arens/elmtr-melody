<?php

namespace Melody\Widgets;

interface WidgetInterface {

    /**
     * Get widget name
     * 
     * @return string
     */
    public function get_name();

    /**
     * Get widget title
     * 
     * @return string
     */
    public function get_title();

    /**
     * Get widget icon
     * 
     * @return string
     */
    public function get_icon();

    /**
     * Get widget categories
     * 
     * @return array
     */
    public function get_categories();
}