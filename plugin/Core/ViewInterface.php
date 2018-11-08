<?php

namespace Melody\Core;

interface ViewInterface {

    /**
     * Render a template
     */
    public function render($templatePath, array $vars = [], $buffer = true);
}