<?php

class FullSteve {
    
    public $id;
    public $firstName;
    public $lastName;
    public $email;
    public $description;
    
    public function __construct($id, $fname, $lname, $email, $description) {
        $this->id    = $id;
        $this->firstName = $fname;
        $this->lastName = $lname;
        $this->email = $email;
        $this->description = $description;
    }
    
    public static function factory() { 
        return new FullSteve(null,'','','','');
    }
}
