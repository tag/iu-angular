<?php
require('../../app/environment.php');

// First, validate input. Can a Steve object be successfully created?
// Our example class doesn't do any validation on values, but it could,
// and in a real project, almost certainly should.

$steve =  new FullSteve(
    0, // #id is falsey, as it hasn't been created yet
	$_POST['firstName'],
	$_POST['lastName'],
    $_POST['email'],
    $_POST['description']
);

$db = new PDO(DB_CONNECT, DB_USER, DB_PASSWORD); 

$statement = $db->prepare('INSERT INTO AllTheSteves (firstName, lastName, email, description) VALUES (?, ?, ?, ?)'); 

//Similar to previous file, but this time with more information and a parameter
$success = $statement->execute(
    array(
        $steve->firstName,
        $steve->lastName,
        $steve->email,
        $steve->description
    )
);

if (!$success) {
    header("HTTP/1.1 500 Error");
    var_dump($statement->errorInfo());
    exit ('Bad SQL');
}

// An INSERT statement won't return rows ...
// The PDO::lastInsertId() function is driver specific, but will work for MySQL
$steve->id = $db->lastInsertId();

// Return the newly created user, complete with its new id
echo json_encode($steve);
