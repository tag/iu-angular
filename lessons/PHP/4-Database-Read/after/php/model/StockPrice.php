<?php

/**
 * Basic information about a day's stock quote.
 */
class StockPrice
{
    /** @var float Stock ticker symbol  */
    public $ticker;

    /** @var string Date of the response. */
    public $date;

    /** @var float Open price for the day. */
    public $open;

    /** @var float High price for the day. */
    public $high;

    /** @var float Low price for the day. */
    public $low;
	
    /** @var float Close price for the day. */
    public $close;
	
    /** @var int Volume price for the day. */
    public $volume;
	
    /** @var float Adjusted close price for the day. */
    public $adjClose;
	
    public function __construct($data) {
        $this->ticker = $data['ticker'];
        $this->date   = $data['date'];
        $this->open   = floatval($data['open']);
        $this->high   = floatval($data['high']);
        $this->low    = floatval($data['low']);
        $this->volume = floatval($data['volume']);
        
        $this->close  = isset($data['close']) ? floatval($data['close']) : null;
        $this->adjClose = isset($data['close']) ? floatval($data['adjClose']) : null;
    }
}
