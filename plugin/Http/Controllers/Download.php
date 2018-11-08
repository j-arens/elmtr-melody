<?php

namespace Melody\Http\Controllers;

use Melody\Http\Controllers\Controller;
use Melody\Http\Request;

class Download extends Controller {
    /**
     * {@inheritdoc}
     */
    protected function respond() {
        if (!$this->validateRequest()) {
            return http_response_code(403);
        }

        $attachmentId = $this->request->getParam('attachment');
        $path = $this->getAttachmentPath($attachmentId);

        if (!$path) {
            return http_response_code(404);
        }

        $mime = get_post_mime_type($attachmentId);
        $this->streamFile($path, $mime);
    }
    
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
    protected function validateRequest() {
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
        if (ob_get_length()) {
            ob_end_flush();
        }
        header("Content-Type: $mime");
        header('Content-Disposition: attachment; filename="'.basename($path).'"');
        readfile($path);
    }
}
