<?php

/*
Plugin Name: Melody
Plugin URI: https://github.com/j-arens/elmtr-melody
Version: 1.0.0-alpha.1
Description: A highly customizable audio widget for Elementor with advanced capabilities.
Author: <a href="https://github.com/j-arens">Josh Arens</a>
Author URI: https://github.com/j-arens
Text Domain: melody
Domain Path: /languages
Tags: audio player, mp3 player, elementor, elementor audio widget 
*/

require 'constants.php';
require_once MELODY_BASE_DIR . '/vendor/autoload.php';

\Melody\Checks::passesChecks() && add_action('elementor/init', function() {
    require MELODY_PLUGIN_DIR . '/bootstrap.php';
});

// plugin update checker
// addQueryArgFilter method
// https://github.com/YahnisElsts/plugin-update-checker/blob/5e48f0c8530fea82b6683f15c8cc89485d262875/Puc/v4p4/Plugin/UpdateChecker.php
