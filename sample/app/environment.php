<?php

define('DB_CONNECT',  'mysql:host=localhost;dbname=msis');
define('DB_USER',     'root');
define('DB_PASSWORD', '');

/*
 * Set the working directory (and thus, the include path) to the local file's 
 * directory, so all of the includes anywhere in the application have the 
 * same starting point.
 */
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
 * Angular sends POST data in JSON format, unlike standard HTML, or pretty
 * much every other web framework. Thus, we need to compensate, and convert
 * the incoming JSON into something we can use.
 */
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $contentTypes = explode(';', $_SERVER['CONTENT_TYPE']); //parse content_type headers
    if ($contentTypes[0] == 'application/json') {
        $_POST = json_decode(file_get_contents('php://input'), true);
    }
}


/*
 * Allow POSTs from cross-origin.
 * Also, send appropriate content type headers for API endpoints (it's polite)
 */
//header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');


/*
 * Sign your code
 */
header('X-All-Your-Base: Are belong to Tom');

