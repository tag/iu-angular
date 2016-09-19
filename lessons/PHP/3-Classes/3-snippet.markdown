# 3. Classes 

- [ ] Explain model objects (a representation of what we will be returning); mention MVC pattern

- [ ] Create a folder for your models: `php/Model`

- [ ] Make a class file:

  - Create a file for your model. For simplicity, name your file the same as
    the class name: `php/Model/StockPrice.php`

  - Class names are typically capitalized.

- [ ] Brief explanation of classes and instances

  - A Student class would represent students generally (their properties and
    methods), and is a template for a Student. An *instance* of Student would
    represent specific students.

- [ ] Enter the basics of the file:
  
  ```php
  <?php
  
  class StockPrice
  {
  }
  ```

- [ ] Add some attributes to the class:
  
  ```php
  /**
   * Basic information about a type of tool.
   */
  class StockPrice
  {
    /** @var float Stock ticker symbol  */
    public $ticker;

    /** @var string Date of the response. */
    public $date;
	
    /** @var float Open price for the day. */
    public $open;
  }
  ```

    - Explain `public`, `private`

    - We'll set all attributes to public for simplicity, and because they need
      to be public for `json_encode()` to see them.

    - INSTRUCTOR NOTE: By default, `json_encode()` only includes public
      attributes. We could encode private attributes by implementing the
      [`JsonSerializable`](http://php.net/manual/en/class.jsonserializable.php)
      interface, but that's more complicated than we have time for.

    - Comments are // or /* */, like most "curly brace languages.
    
    - The "docblock" comments (two stars on opening) are for a documentation
      tool called PHPDoc. PHPDoc is similar to JavaDoc, and helps automatically
      generate documentation for your source code. We won't be using PHPDoc,
      but these sorts of comments are a good habit to get into.
    
    - IMPORTANT: This model should match what Anglar expects (in terms of
      attribute names), not necessarily the names the db is using. Our model
      attribute namaes and our Javascript attribute names **MUST** match.
    
- [ ] EXCERCISE: Add the remaining attributes of `StockPrice`: 
  `$high`, `$low`, `$close `$volume`, and `$adjClose`.

  ```php
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
 
  }
  
  ```

  - [ ] When inside class methods, access members with `$this->varName`
    (NOT `$this->$varName`)
    
  - [ ] Methods look much like they do in Javascript. Our models won't need
    many methods other than the constructor.
    
  - [ ] Constructors in PHP have a special name: `__construct()`.

    - Methods that start with double underscore are reserved by PHP

    - We can give the constructor parameters, just as we can any other method.
    
      ```php
      class StockPrice
      {
          // ** SNIP **
     
          public function __construct($ticker, $date, $open, $high, $low, $volume, $close, $adjClose) {
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
      ```

    - Instead of overloading (like Java, or C), methods may have optional 
	  parameters. When a parameter is declared optional, assign it a default value
	  in the parameter list. All further parameters of theat method must then have 
	  default values.
    
      ```php
      class StockPrice
      {
          // ** SNIP **
      
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
      ```

  - [ ] Let's test our model with some dummy data. We will modify `api/StockPrice.php`
    to use our new Model object.
    
    - We'll need to add a `require` statement, so PHP knows where our class
      definition is.
      
    - Create a couple of instances.
    
    - Change a value in one of the instances.

    ```php
    <?php      // api/StockPrice.php
    
    require '../app/Model/StockPrice.php';
    
    $arr = array();
    
    $stock = new StockPrice(
        'MSFT',
		'2016-09-16',
		57.630001,   // open
		57.630001,   // high
		56.75,       // low
		44493500,    // volume
		57.25,       // close
		57.25        // adjClose
    );

    $stockToo = new StockPrice(
        'AAPL',             
        '2016-09-16',           
        115.120003,   // open
        116.129997,   // high            
        114.040001,   // low
	    79677200,     // volume
		114.919998,   // close
	    114.919998    // adjClose      
    );
    
    $stockToo->open = 65.0;
    
    array_push($arr, $stock);
    array_push($arr, $stockToo);
    
    echo json_encode($arr);
    ```
    
  - [ ] Instead of handling the dependencies in each class, let's do it once in
    a common file. Create `app/environment.php`, and add the following:
    
      ```php
      <?php      // app/environment.php
      /**
       * A file common to all HTTP API calls.
       */
      set_include_path(__DIR__);
      chdir(__DIR__);
      
      require 'Model/StockPrice.php';
      
      // Add the path of other models here
      ```
    
    - The "magic constant" `__DIR__` is always equal to the current directory
      of the current file.
    
    - In `api/StockPrice.php`, add the following at the top of the file
      (instead of our previous `require` statement):
    
      ```php
      <?php      // api/StockPrice.php
      require '../app/environment.php';
      
      // SNIP
      ```
