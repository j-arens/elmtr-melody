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
        $manifest = json_decode('{"entries":{"melody":{"deps":["common-adapter-melody","vendors-adapter-melody"]},"controls":{"deps":["vendors-controls"]},"adapter":{"deps":["common-adapter-melody","vendors-adapter-melody","vendors-adapter"]}},"chunks":{"common-adapter-melody":{"hash":"9ce73e102a044aa9da6c26e264d41661","file":"common-adapter-melody.dev.js"},"vendors-adapter-melody":{"hash":"8aaa67358acdf02ae49f09885f354507","file":"vendors-adapter-melody.dev.js"},"melody":{"hash":"090fe5782ce2f66f0c58fcdec365dcda","file":"melody.dev.js"},"vendors-controls":{"hash":"9b97be06ff170f939849d8b0af449c43","file":"vendors-controls.dev.js"},"controls":{"hash":"6df2508614973f820a52a0b7bb258f2a","file":"controls.dev.js"},"vendors-adapter":{"hash":"e9d17a3b8cacd68836dc5347176991f6","file":"vendors-adapter.dev.js"},"adapter":{"hash":"91d3bd29ec22d1307fa4dcef845d2fcd","file":"adapter.dev.js"}}}', true);
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
