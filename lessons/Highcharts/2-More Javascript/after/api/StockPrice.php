<?php
require('../app/environment.php');

$db = new PDO(DB_CONNECT, DB_USER, DB_PASSWORD); 

$statement = $db->prepare('SELECT * FROM StockPrice ORDER BY date DESC LIMIT 10'); // Warning: This returns *many* rows without the LIMIT!
$success = $statement->execute();

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
