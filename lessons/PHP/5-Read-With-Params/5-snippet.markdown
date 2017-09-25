# 5. Read with Parameters

  - [ ] Add folder `api/StockPrice`

  - [ ] Add file `api/StockPrice/byDate.php`

  - [ ] Review HTTP methods GET and POST, introduce PHP magic
        "superglobals" [`$_GET`](http://php.net/manual/en/reserved.variables.get.php), 
		[`$_POST`](http://php.net/manual/en/reserved.variables.post.php)
    
  - [ ] It may be easiest to copy/paste the contents of 
    `/api/StockPrice.php` to `byDate.php`.

  - [ ] Include our environment file (path is one level deeper than before)

  - [ ] Explain that we'll read in the data from `$_GET`
    
  - [ ] Open a db connection, and prepare the SQL
    
    ```php
    require('../../php-app/environment.php');

    $db = new PDO(DB_CONNECT, DB_USER, DB_PASSWORD);

    $sql = 'SELECT * FROM StockPrice WHERE date = ? AND ticker = ?';

    $statement = $db->prepare($sql);

    $success = $statement->execute(
        array(
            $_GET['date'],
            $_GET['ticker']
        )
    );
    ```
    
  - [ ] Parameterized queries: Explain the ? marks in the above statement, and how
    the parameters get passed as an array to [`execute()`](http://php.net/manual/en/pdostatement.execute.php).
    
    - Among other benefits, this prevents SQL injection (a type of security hole)

    - **DO NOT EVER** simple append inputs to a query.
    
  - [ ] Handle the query results, and output JSON as before

    - Both parameters must be included for this to work, because of how we define the file.
        
    ```php
    <?php
    if (!$success) {
        header("HTTP/1.1 500 Error");
        var_dump($statement->errorInfo());
        exit ('Bad SQL');
    }

    $arr = array();
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
    
        $stock =  new StockPrice($row);
        
        array_push($arr, $stock);
    }

    echo json_encode($arr);
    ```
