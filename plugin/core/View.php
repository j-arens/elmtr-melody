<?php

namespace Melody\Core;

use InvalidArgumentException;

class View implements ViewInterface {

    /**
     * Check if a file exists at the given path
     * 
     * @param string $path
     */
    protected function templateExists($path) {
        if (!file_exists($path)) {
            throw new InvalidArgumentException(
                "Could not locate template at {$path}"   
            );
            return;
        }

        return true;
    }

    /**
     * Output buffer the given template
     * 
     * @param string $path
     * @param array $vars
     */
    protected function buffer($path, array $vars) {
        extract($vars);
        ob_start();
        include $path;
        return ob_get_clean();
    }

    /**
     * Echo the given template
     * 
     * @param string $templatePath
     * @param array $vars
     * @param boolean $buffer
     */
    public function render($templatePath, array $vars = [], $buffer = true) {
        if (!$this->templateExists($templatePath)) {
            return;
        }

        if ($buffer) {
            echo $this->buffer($templatePath, $vars);
            return;
        }

        extract($vars);
        $template = include $templatePath;
        echo $template;
    }
}