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

  - (SKIP) Instead of overloading (like Java, or C), methods may have optional
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
  
  - Having this many parameters to a constructor is messy. It's common (especially in Javascript) to just pass
    in an associative array of values.
    
    Notice how in this example, we also use the constructor to force types for the numeric attributes with [`floatval()`](http://php.net/manual/en/function.floatval.php)
    
    ```php
    public function __construct($data) {
        $this->ticker = $data['ticker'];
        $this->date   = $data['date'];
        $this->open   = floatval($data['open']);
        $this->high   = floatval($data['high']);
        $this->low    = floatval($data['low']);
        $this->volume = floatval($data['volume']);
        $this->close  = floatval($data['close']);
        $this->adjClose = floatval($data['adjClose']);
    }
    ```
  
  - Currently if any field isn't provided in the input array, this will error. What if we wanted `'close'` and `'adjClose'` to be optional? Use the `isset()` method, and the ternary "if" operator:
    
    ```php
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
    ```
  
- [ ] Let's test our model with some dummy data. We will modify `api/StockPrice.php`
    to use our new Model object.
    
    - We'll need to add a `require` statement, so PHP knows where our class
      definition is.
      
    - Create a couple of instances.
    
    - Change a value in one of the instances.

    ```php
    <?php      // We are in api/StockPrice.php
    
    require '../php/Model/StockPrice.php';
    
    $arr = array();
    
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
      of the current file. The `set_include_path()` method tells PHP to start looking
      from the directory our environment file is in.
    
    - In `api/StockPrice.php`, add the following at the top of the file
      (instead of our previous `require` statement):
    
      ```php
      <?php      // api/StockPrice.php
      require '../app/environment.php';
      
      // SNIP
      ```
