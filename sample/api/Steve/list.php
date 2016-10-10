<?php
require('../../app/environment.php');

$db = new PDO(DB_CONNECT, DB_USER, DB_PASSWORD); 

$statement = $db->prepare('SELECT id, firstName, lastName, email, description FROM AllTheSteves ORDER BY lastName, firstName'); 
$success = $statement->execute();

if (!$success) {
    header("HTTP/1.1 500 Error");
    var_dump($statement->errorInfo());
    exit ('Bad SQL');
}

$arr = array();
while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {

	$steve =  new FullSteve(
	    $row['id'],
		$row['firstName'],
		$row['lastName'],
        $row['email'],
        $row['description']
	);
	
    array_push($arr, $steve);
}

echo json_encode($arr);
