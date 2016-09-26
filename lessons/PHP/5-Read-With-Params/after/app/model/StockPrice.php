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
	
    public function __construct($ticker, $date, $open, $high, $low, $volume, $close = null, $adjClose = null) {
        $this->ticker = $ticker;
        $this->date   = $date;
        $this->open   = $open;
        $this->high   = $high;
        $this->low    = $low;
        $this->volume = $volume;
        $this->close  = $close;
        $this->adjClose = $adjClose;
    }
}
