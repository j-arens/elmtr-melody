<?php

namespace Melody\core;

interface ViewInterface {

    /**
     * Render a template
     */
    public function render($templatePath, array $vars = [], $buffer = true);
}