<?php

/**
 * 1.0.0
 * 
 * This file is dynamically generated by the WordPressChunkLoaderPlugin for Webpack.
 * 
 * Documentation can be found at 
 * 
 * Contributors:
 * 
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

namespace WordPressChunkLoaderPlugin;

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
        $manifest = json_decode('{"entries":{"melody":{"deps":["common-adapter-melody","vendors-adapter-melody"]},"controls":{"deps":["vendors-controls"]},"adapter":{"deps":["common-adapter-melody","vendors-adapter-melody"]}},"chunks":{"common-adapter-melody":{"hash":"5e92fb37d95e441421a1d8bbcec0d5b7","file":"common-adapter-melody.5e92fb37d95e441421a1.js"},"vendors-adapter-melody":{"hash":"1c23fb37bf5aa9f78afd3ec0c4598b21","file":"vendors-adapter-melody.1c23fb37bf5aa9f78afd.js"},"melody":{"hash":"e1b8d35e5d01d3bba2b9505a71595929","file":"melody.e1b8d35e5d01d3bba2b9.js"},"vendors-controls":{"hash":"7a9be9ac8e4cb634cc1c31baa1833f58","file":"vendors-controls.7a9be9ac8e4cb634cc1c.js"},"controls":{"hash":"cd27c7f9977fa6fa1d355646e1de48ee","file":"controls.cd27c7f9977fa6fa1d35.js"},"adapter":{"hash":"3dfc71c2e90f7c2379e1ce1fb3c7519f","file":"adapter.3dfc71c2e90f7c2379e1.js"}}}', true);
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
    if (wp_script_is("melody-js-$asset", 'registered')) {
        return true;
    }
    return false;
}

/**
 * Get the full url to an asset
 * 
 * @param string $file
 * @return string
 */
function getAssetUrl($file)
{
    $assetPath = trailingslashit('elmtr-melody/public/js');
    if ('plugin' === 'plugin') {
        return plugins_url($assetPath . $file);
    }
    return get_theme_file_uri($assetPath . $file);
}

/**
 * Maps an assets dependencies by name
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
function buildScriptArgs($asset, array $data)
{
    $handle = "melody-js-$asset";
    $src = getAssetUrl($data['file']);
    $deps = mapDependencies($asset);
    $version = $data['hash'];
    $inFooter = true;
    return compact('handle', 'src', 'deps', 'version', 'inFooter');
}

/**
 * Register assets
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
    $success = call_user_func_array(
        'wp_register_script',
        apply_filters('wpclp_register_script', $args)
    );
    if (!$success) {
        throw new AssetRegistrationException("Unable to register $asset!");
        return false;
    }
    return true;
}

/**
 * Registers all assets in the manifest
 * 
 * @return void
 */
function processManifest()
{
    $manifest = getManifest();
    foreach ($manifest['chunks'] as $chunk => $data) {
        if (isRegistered($chunk)) {
            continue;
        }
        $args = buildScriptArgs($chunk, $data);
        register($chunk, $args);
    }
}
