<?php
require('../../app/environment.php');

$db = new PDO(DB_CONNECT, DB_USER, DB_PASSWORD); 

$sql = 'SELECT * FROM StockPrice WHERE date >= ? AND date <= ? AND ticker = ?';

$statement = $db->prepare($sql);

// Passing in an array of values from the HTTP request
// One value per question mark, and in the same order
$success = $statement->execute(
    array(
        $_GET['startDate'],
        $_GET['endDate'],
        $_GET['ticker']
    )
);

if (!$success) {
    header("HTTP/1.1 500 Error");
    var_dump($statement->errorInfo());
    exit ('Bad SQL');
}

$arr = array();
while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {

	$stock =  new StockPrice(
	    $row['ticker'],
		$row['date'],
		$row['open'],
		$row['high'],
		$row['low'],
		$row['volume'],
		$row['close'],
		$row['adjClose']
	);
	
    array_push($arr, $stock);
}

echo json_encode($arr);
