<?php

require '../app/environment.php';

$stock = new StockPrice(
    'AAPL',      
    '2016-09-16',
    115.120003,    // open
    116.129997,    // high
    114.040001,    // low
	79677200,      // volume
	114.919998,    // close
	114.919998     // adjClose
);

$stockToo =  new StockPrice(
    'MSFT',      
    '2016-09-16',
    57.630001,    // open
    57.630001,    // high
    56.75,        // low
	44493500,     // volume
	57.25,        // close
	57.25         // adjClose
);

$stockToo->open = 65.0;

$arr = array();

array_push($arr, $stock);
array_push($arr, $stockToo);

echo json_encode($arr);
