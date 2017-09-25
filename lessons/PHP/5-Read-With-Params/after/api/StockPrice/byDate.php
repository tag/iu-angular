<?php
require('../../php/environment.php');

// 1. Create a database connection
$db = new PDO(DB_CONNECT, DB_USER, DB_PASSWORD);

// 2. Prepare the query
$sql = 'SELECT * FROM StockPrice WHERE date = ? AND ticker = ? LIMIT 10';

$statement = $db->prepare($sql);

// 3. Run the query (with parameters)
// Passing in an array of values from the HTTP request
// One value per question mark, and in the same order
$success = $statement->execute(
    array(
        $_GET['date'],
        $_GET['ticker']
    )
);

if (!$success) {
    header("HTTP/1.1 500 Error");
    var_dump($statement->errorInfo());
    exit ('Bad SQL');
}

// 4. Handle query results
$arr = array();
while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {

    $stock =  new StockPrice($row);
    
    array_push($arr, $stock);
}

echo json_encode($arr);
