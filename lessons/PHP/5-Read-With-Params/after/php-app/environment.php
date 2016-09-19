<?php

define('DB_CONNECT',  'mysql:host=localhost;dbname=FieldEngineer');
define('DB_USER',     'root');
define('DB_PASSWORD', '');

set_include_path(__DIR__);
chdir(__DIR__);

require 'Model/MasterTool.php';

// Add the path of each other model here
