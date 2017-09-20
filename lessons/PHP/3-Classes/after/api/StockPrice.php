<?php

require '../app/environment.php';
// Add the path to other models used in this file here

$stock = new StockPrice(
    [
        'ticker' => 'AAPL',
        'date'   => '2016-09-16',
        'open'   => '115.120003',
        'high'   => '116.129997',
        'low'    => '114.040001',
        'volume' => '79677200',
        'close'  => '114.919998',
        'adjClose' => '114.919998'
    ]
);

$stockToo =  new StockPrice(
    [
        'ticker' => 'MSFT',
        'date'   => '2016-09-16',
        'open'   => '57.630001',
        'high'   => '57.630001',
        'low'    => '56.75',
        'volume' => '44493500'
        // Let's leave out 'close' and 'adjClose' to test whether our optionality for these fields works.
    ]
);

$stockToo->open = 65.0;

$arr = array();

array_push($arr, $stock);
array_push($arr, $stockToo);

echo json_encode($arr);
