<?php
require '../../app/environment.php';

$obj = new StockPrice (
    $_POST['ticker'],
    $_POST['date'],
    $_POST['open'], 
    $_POST['high'],
    $_POST['low'],  
    $_POST['volume'], 
    $_POST['close'],  
    $_POST['adjClose']
);

// STEP 1: Connect to database
$db = new PDO(DB_CONNECT, DB_USER, DB_PASSWORD);


// STEP 2: Prepare query
$sql = 'INSERT INTO StockPrice(ticker, date, open, high, low, volume, close, adjClose) '
       .' VALUES (?,?,?,?,?,?,?,?)';

$statement = $db->prepare($sql);

// STEP 3: Run the query
$success = $statement->execute(
    array(
        $obj->ticker,
        $obj->date,
        $obj->open, 
        $obj->high,
        $obj->low,  
        $obj->volume, 
        $obj->close,  
        $obj->adjClose
    )
);

if (! $success) {
    header('HTTP/1.1 500 Error');
    var_dump($statement->errorInfo());
    exit('Bad SQL');
}

// STEP 4: Hande the results

echo json_encode($obj);
