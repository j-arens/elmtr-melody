<?php

namespace Melody\Test;

class GlobalMockGenerator {
    /**
     * @var array
     */
    protected $defaultConfig = [
        'entries' => [],
        'output' => '',
        'dependencies' => [],
    ];

    /**
     * @var array
     */
    protected $config;

    /**
     * @param array $config
     */
    public function __construct(array $config) {
        $this->config = array_merge($this->defaultConfig, $config);
    }

    /**
     * 
     */
    public function generate() {
        if (empty($this->config['entries'])) {
            throw new \Exception('No entries to scan');
            return;
        }

        $files = $this->scanEntries();
        $functions = $this->getFunctions($files);

        print_r($functions);

        exit();
    }

    /**
     * @return array
     */
    protected function scanEntries(): array {
        return array_reduce($this->config['entries'], function(array $acc, string $entry) {
            if (!is_dir($entry) && file_exists($entry)) {
                $acc[] = $entry;
                return $acc;
            }
            $fs = array_diff(scandir($entry), ['..', '.']);
            foreach($fs as $target) {
                if (is_dir($target)) {
                    array_merge($acc, $this->scanEntries($target));
                }
                $acc[] = $entry . DIRECTORY_SEPARATOR . $target;
            }
            return $acc;
        }, []);
    }

    /**
     * @return array
     */
    protected function getFunctions(array $files): array {
        // try {
        //     foreach($files as $file) {
        //         require $file;
        //     }
        // } catch (\Exception $err) {

        // } finally {
        //     $functions = get_defined_functions();
        //     return $functions;
        // }
        $functions = [];

        foreach($files as $file) {
            try {
                require $file;
            } catch (\Exception $err) {
                // var_dump('Exception!');
                // var_dump($err->getTrace());
                // // var_dump(debug_backtrace());
                // die;
            }
        }

        return $functions;
    }
}


// temp

$config = [
    'entries' => [
        './elementor-melody.php',
        './plugin'
    ],
    'output' => '',
    'dependencies' => [

    ],
];

$generator = new GlobalMockGenerator($config);

$generator->generate();
