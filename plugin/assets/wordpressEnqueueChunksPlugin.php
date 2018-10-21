<?php

/**
 * 
 * This file is dynamically generated by the WordpressEnqueueChunksPlugin for Webpack.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
 * OR OTHER DEALINGS IN THE SOFTWARE.
 * 
 */
 

namespace WordpressEnqueueChunksPlugin;

class AssetRegistrationException extends \Exception {};

/**
 * Get the manifest
 * 
 * @return array
 */
function getManifest()
{
    static $manifest = null;
    if (is_null($manifest)) {
        $manifest = json_decode('{"chunks":{"common-adapter-melody":{"file":"common-adapter-melody.dev.js","hash":"fb42cd76ccfd6c1f7a411fac95670eca"},"vendors-adapter-melody":{"file":"vendors-adapter-melody.dev.js","hash":"8aaa67358acdf02ae49f09885f354507"},"melody":{"file":"melody.dev.js","hash":"090fe5782ce2f66f0c58fcdec365dcda"},"vendors-controls":{"file":"vendors-controls.dev.js","hash":"9b97be06ff170f939849d8b0af449c43"},"controls":{"file":"controls.dev.js","hash":"f03c117308e7eac04b53480e3eb0712c"},"vendors-adapter":{"file":"vendors-adapter.dev.js","hash":"7e7231a5dfd4dd85ff6d9b80d1801e60"},"adapter":{"file":"adapter.dev.js","hash":"1cfc85ba28ad87ff013d6829b08bb2b1"}},"entries":{"melody":{"deps":["common-adapter-melody","vendors-adapter-melody"]},"controls":{"deps":["vendors-controls"]},"adapter":{"deps":["common-adapter-melody","vendors-adapter-melody","vendors-adapter"]}}}', true);
    }
    return $manifest;
}

/**
 * Check if a script has already been registered
 * 
 * @param string $asset
 * @return boolean
 */
function isRegistered($asset)
{
    return wp_script_is("melody-js-$asset", 'registered');
}

/**
 * Get the full url to an asset
 * 
 * @param string $file
 * @param string $context
 * @return string
 */
function getAssetUrl($file, $context)
{
    $dir = trailingslashit('elmtr-melody/public/js');
    if ($context === 'plugin') {
        return plugins_url($dir . $file);
    }
    return get_theme_file_uri($dir . $file);
}

/**
 * Maps an asset's dependencies by name
 * 
 * @param string $asset
 * @return array
 */
function mapDependencies($asset)
{
    $manifest = getManifest();
    if (isset($manifest['entries'][$asset])) {
        return array_map(function($dep) {
            return "melody-js-$dep";
        }, $manifest['entries'][$asset]['deps']);
    }
    return [];
}

/**
 * Generates arguments to be passed to wp_register_script
 * 
 * @param string $asset
 * @param array $data
 * @return array
 */
function makeScriptArgs($asset, array $data)
{
    $handle = "melody-js-$asset";
    $src = getAssetUrl($data['file'], 'plugin');
    $deps = mapDependencies($asset);
    $version = $data['hash'];
    $inFooter = true;
    return compact('handle', 'src', 'deps', 'version', 'inFooter');
}

/**
 * Register an asset
 * 
 * @param string $asset
 * @param array $args
 * @return boolean
 */
function register($asset, array $args)
{
    if (isRegistered($asset)) {
        return true;
    }
    $filtered = apply_filters("wpecp/register/$asset", $args);
    $success = call_user_func_array('wp_register_script', $filtered);
    if (!$success) {
        throw new AssetRegistrationException("Unable to register $asset!");
        return false;
    }
    return true;
}

/**
 * Get an array of chunks and chunk meta from an array of script names
 * 
 * @param array $assets
 * @param array $manifest
 * @return array
 */
function getChunks(array $assets, array $manifest)
{
    if (empty($assets)) {
        return $manifest['chunks'];
    }
    $deps = array_reduce($assets, function($acc, $asset) use($manifest) {
        if (isset($manifest['entries'][$asset])) {
            return array_merge($acc, $manifest['entries'][$asset]['deps']);
        }
        return $acc;
    }, []);
    $keys = array_flip(array_unique(array_merge($assets, $deps)));
    return array_intersect_key($manifest['chunks'], $keys);
}

/**
 * Registers all or just some of the assets in a manifest
 * 
 * @param array $scripts
 * @return void
 */
function registerScripts(array $scripts = [])
{
    $manifest = getManifest();
    foreach (getChunks($scripts, $manifest) as $chunk => $data) {
        if (isRegistered($chunk)) {
            continue;
        }
        $args = makeScriptArgs($chunk, $data);
        register($chunk, $args);
    }
}
