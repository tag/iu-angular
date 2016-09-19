<?php

/**
 * Basic information about a type of tool.
 */
class MasterTool
{
    /** @var int Internal database id.  */
    public $id;

    /** @var string Name of the tool. */
    public $name;

    /** @var string Description of the tool. */
    public $description;

    /** @var float|null Retail price of the tool. */
    public $price;

    /** @var float|null Typical weight of the tool. */
    public $weight;

    public function __construct($pId, $pName, $pDescription, $pPrice, $pWeight) {
        $this->id     = $pId;
        $this->name   = $pName;
        $this->description = $pDescription;
        $this->price  = $pPrice;
        $this->weight = $pWeight;
    }
}