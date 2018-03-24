<?php

namespace Melody\Http\controllers;

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
        exit;
    }

    /**
     * Response returned from controller
     */
    abstract protected function respond();
}