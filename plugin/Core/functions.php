<?php

namespace Melody\Core\functions;

/**
 * Includes all of the files in the given dir and returns them
 * 
 * @param string $dir
 * @return Closure
 */
function collect($dir) {
    if (!is_dir($dir)) {
        return [];
    }

    $files = array_diff(scandir($dir), ['..', '.']);
    $included = [];

    foreach($files as $file) {
        if (is_dir($dir . $file)) {
            continue;
        }
        $included[] = include $dir . $file;
    }

    return $included;
}
