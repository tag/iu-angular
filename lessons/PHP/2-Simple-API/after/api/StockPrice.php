<?php

$stock = array(
    'ticker'   => 'AAPL',
    'date'     => '2016-09-16',
    'open'     => 115.120003,
    'high'     => 116.129997,
    'low'      => 114.040001,
	'close'    => 114.919998,
	'volume'   => 79677200,
	'adjClose' => 114.919998
);

$stockToo =  array(
    'ticker'   => 'MSFT',
    'date'     => '2016-09-16',
    'open'     => 57.630001,
    'high'     => 57.630001,
    'low'      => 56.75,
	'close'    => 57.25,
	'volume'   => 44493500,
	'adjClose' => 57.25
);

$stockToo['open'] = 65.0;

$arr = array();

array_push($arr, $stock);
array_push($arr, $stockToo);

echo json_encode($arr);
