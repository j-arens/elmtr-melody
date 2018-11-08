<?php

namespace Melody\Http;

class Request {

    /**
     * @var string
     */
    protected $method;

    /**
     * @var array
     */
    protected $params;

    /**
     * Request constructor
     */
    public function __construct() {
        $this->method = $_SERVER['REQUEST_METHOD'];
        $this->setParams();
    }

    /**
     * Sets the params based on the request method
     */
    protected function setParams() {
        if ($this->method === 'GET') {
            $this->params = $_GET;
        } elseif ($this->method = 'POST') {
            $this->params = $_POST;
        } else {
            $this->params = [];
        }
    }

    /**
     * Get a query param with optional default
     * 
     * @param string $var
     * @param string $default
     * @return mixed
     */
    public function getParam($var = null, $default = null) {
        return isset($this->params[$var]) ? $this->params[$var] : $default;
    }

    /**
     * Get the request method
     * 
     * @return string
     */
    public function getMethod() {
        return $this->method;
    }
}