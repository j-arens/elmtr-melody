<?php

namespace Melody\Test\Helpers;

function overrideMethodAccess($class, string $method): \Closure {
    $refMethod = new \ReflectionMethod($class, $method);
    $refMethod->setAccessible(true);
    return function(...$params) use ($class, $refMethod) {
        return $refMethod->invoke($class, ...$params);
    };
}
