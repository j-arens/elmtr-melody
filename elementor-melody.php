<?php

/*
Plugin Name: Elementor-Melody
Plugin URI: 
Version: 1.0.0-alpha.1
Description:
Author: <a href="https://github.com/j-arens">Josh Arens</a>
Author URI: https://github.com/j-arens
Text Domain: elmtr-melody
Domain Path: /languages
Tags:
*/

require 'constants.php';
require_once MELODY_BASE_DIR . '/vendor/autoload.php';

\Melody\Checks::passesChecks() && add_action('elementor/init', function() {
    require MELODY_PLUGIN_DIR . '/bootstrap.php';
});

// plugin update checker
// addQueryArgFilter method
// https://github.com/YahnisElsts/plugin-update-checker/blob/5e48f0c8530fea82b6683f15c8cc89485d262875/Puc/v4p4/Plugin/UpdateChecker.php
