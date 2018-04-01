<?php

namespace Melody\Core\Functions;

/**
 * Returns a closure that will include all of the files
 * in the given $dir
 * 
 * @param string $dir
 * @return Closure
 */
function collect($dir) {
    return function() use($dir) {
        if (!is_dir($dir)) {
            return [];
        }
    
        $files = array_diff(scandir($dir), ['..', '.']);
    
        return array_map(function($file) use($dir) {
            return include $dir . $file;
        }, $files);
    };
}
