<?php

namespace Melody\Http\Controllers;

use Melody\Http\Request;

abstract class Controller {

    /**
     * @var Request
     */
    protected $request;

    /**
     * Controller constructor
     */
    public function __construct(Request $req) {
        $this->request = $req;
        $this->respond();
        if (defined('MELODY_TEST') && MELODY_TEST) {
            return;
        } else {
            exit;
        }
    }

    /**
     * Response returned from controller
     */
    abstract protected function respond();
}