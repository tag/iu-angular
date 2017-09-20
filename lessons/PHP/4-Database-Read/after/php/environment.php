<?php

// TODO: You ** MUST ** change the dbname, dbuser, and password values to 
//       match what your team has assigned.

// In a "real" application, the db and authentication information would be kept
// in a configuration file, outside of version control. Don't *ever* store
// passwords in a code file directly, if you can help it.

define('DB_CONNECT',  'mysql:host=localhost;dbname=msis');
define('DB_USER',     'root');
define('DB_PASSWORD', '');

set_include_path(__DIR__);
chdir(__DIR__);

require 'model/StockPrice.php';

// Add the path of each other model here

// We'll eventually create an auto-load function, but we're not there yet.
