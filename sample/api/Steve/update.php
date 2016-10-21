<?php
require('../../app/environment.php');

// First, validate input. Can a Steve object be successfully created?
// Our example class doesn't do any validation on values, but it could,
// and in a real project, almost certainly should.

$steve =  new FullSteve(
    $_POST['id'], 
	$_POST['firstName'],
	$_POST['lastName'],
    $_POST['email'],
    $_POST['description']
);

$db = new PDO(DB_CONNECT, DB_USER, DB_PASSWORD); 

$statement = $db->prepare('UPDATE AllTheSteves SET firstName = ?, lastName = ?, email = ?, description = ? WHERE id = ?'); 

// Similar to previous file, but this time with more information and a parameter
$success = $statement->execute(
    array(
        $steve->firstName,
        $steve->lastName,
        $steve->email,
        $steve->description,
        $steve->id  // Notice that `id` is last, not first, because of the order of the ? in the query
    )
);

if (!$success) {
    header("HTTP/1.1 500 Error");
    var_dump($statement->errorInfo());
    exit ('Bad SQL');
}

echo json_encode($steve);
