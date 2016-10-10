<?php

define('DB_CONNECT',  'mysql:host=localhost;dbname=msis');
define('DB_USER',     'root');
define('DB_PASSWORD', '');

chdir(__DIR__);

/*
 * Use an auto-include function instead of requiring each model manually.
 */
spl_autoload_register(function ($class) {
    $class = array('Models', $class);
    //explode('\\', $class); // Namespaces are separated by a backslash

    $class = implode(DIRECTORY_SEPARATOR, $class) . '.php';

    if (file_exists($class)) {
        require($class);
    }
});

/*
 * Send appropriate content type headers for API endpoints (it's polite)
 */
header('Content-type: application/json');

/*
 * Sign your code
 */
header('X-All-Your-Base: Are belong to Tom');

