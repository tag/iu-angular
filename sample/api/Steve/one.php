<?php
require('../app/environment.php');

$db = new PDO(DB_CONNECT, DB_USER, DB_PASSWORD); 


$statement = $db->prepare('SELECT id, firstName, lastName, email, description FROM AllTheSteves WHERE id = ?'); 

//Similar to previous file, but this time with more information and a parameter
$success = $statement->execute(
    array($_GET['id'])
);

if (!$success) {
    header("HTTP/1.1 500 Error");
    var_dump($statement->errorInfo());
    exit ('Bad SQL');
}

// Different from "list" file, this should only return one, not an array.

$one = null;

if ($row = $statement->fetch(PDO::FETCH_ASSOC)) {

	$steve =  new FullSteve(
	    $row['id'],
		$row['firstName'],
		$row['lastName'],
        $row['email'],
        $row['description']
	);
	
    $one = $steve);
} else {
    $one = FullSteve::factory();
}

echo json_encode($one);
