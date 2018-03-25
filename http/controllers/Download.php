<?php

namespace Melody\Http\controllers;

use Melody\Http\controllers\Controller;
use Melody\Http\Request;

class Download extends Controller {
    /**
     * Get the full path for a wp attachment
     * 
     * @param string $id
     * @return string
     */
    protected function getAttachmentPath($id) {
        $path = get_attached_file($id);

        if (!$path) {
            return '';
        }

        return $path;
    }

    /**
     * check for required query params
     * 
     * @return boolean
     */
    protected function vaildateRequest() {
        if (!$this->request->getParam('clientId')) {
            return false;
        }

        if (!$this->request->getParam('attachment')) {
            return false;
        }

        return true;
    }

    /**
     * Stream audio file to output buffer
     * 
     * @param string $path
     * @param string $mime
     */
    protected function streamFile($path, $mime) {
        ob_end_flush();
        header("Content-Type: audio/{$mime}");
        header('Content-Disposition: attachment; filename="'.basename($path).'"');
        @readfile($path);
    }

    /**
     * {@inheritdoc}
     */
    protected function respond() {
        if (!$this->vaildateRequest()) {
            return http_response_code(403);
        }

        $attachmentId = $this->request->getParam('attachment');
        $path = $this->getAttachmentPath($attachmentId);

        if (!$path) {
            return http_response_code(404);
        }

        $mime = get_post_mime_type($attachmentId);
        $clientId = $this->request->getParam('clientId');
        $this->streamFile($path, $mime);
    }
}