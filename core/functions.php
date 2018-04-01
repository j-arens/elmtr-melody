<?php

namespace Melody\Core\functions;

/**
 * Returns a closure that will include all of the files
 * in the given $dir
 * 
 * @param string $dir
 * @return Closure
 */
function collect($dir) {
    if (!is_dir($dir)) {
        return [];
    }

    $files = array_diff(scandir($dir), ['..', '.']);

    return array_map(function($file) use($dir) {
        if (is_dir($dir . $file)) {
            return;
        }
        return include $dir . $file;
    }, $files);
}
