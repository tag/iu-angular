# 4. Connect DB to an array of model
  
  - [ ] Before doing databse work in PHP, have one person in each team connect
    to MySql and make sure they can `SELECT * FROM StockPrice;` in their
    group's database.
    
    - Teams should have already loaded the SQL file in the first PHP lesson,
	  or be willing to adapt the code to adjust their schema.

  - [ ] Explain the steps of connecting to a database:
  
    1. Create connection
    2. Prepare query
    3. Execute (and create `ResultSet` if selecting)
    4. Iterate `ResultSet` (if selecting)

  - [ ] Use PDO to create a database connection

  ```php
  <?php    // api/StockPrice.php
  require '../php-app/environment.php';
  
  $db = new PDO(DB_CONNECT, DB_USER, DB_PASSWORD);
  ```

    - This creates a database connection with our server.
    
    - `DB_CONNECT`, `DB_USER`, etc., are constants. Define them in
      `php-app/environment.php`:
    
      ```php
      define('DB_CONNECT',  'mysql:host=localhost;dbname=team8db');
      define('DB_USER',     'root');
      define('DB_PASSWORD', '');
      ```
    
    - Explain the connect string parts (engine, server, database name)
    
    - Test that it works, briefly, by adding the following testing lines:
    
      ```php
      $db = new PDO(DB_CONNECT, DB_USER, DB_PASSWORD);

      var_dump($db);
      exit;
      ```
    
    - [`var_dump()`][PHP_VAR_DUMP] outputs a variable's type and value; it's
      useful for debugging.
      [PHP_VAR_DUMP]: http://php.net/manual/en/function.var-dump.php
    
    -  When you view the page in the browser, it should print out soemthing like:
      ```
      object(PDO)#2 (0) {
      }
      ```

    - Once you've confirmed the database is connected, delete the two "testing"
      lines, and continue with the file.
    
  - [ ] Create and run a SQL statement:
    
    ```php
    $db = new PDO(DB_CONNECT, DB_USER, DB_PASSWORD);
    
    $sql = 'SELECT * FROM StockPrice LIMIT 1';
    
    $statement = $db->prepare($sql);
    $success = $statement->execute();
    ```
    
    - `$statement->execute()` returns a boolean value indicating success,
      so output should be: `bool(true)`
    
    - In PHP, the ResultSet is accessed through the statement object

  - [ ] Our query might fail silently, so we should check for errors:

  ```php
  $db = new PDO(DB_CONNECT, DB_USER, DB_PASSWORD);
  
  $statement = $db->prepare('SELECT * FROM StockPrice LIMIT 1');
  $success = $statement->execute();
  
  if (!$success) {
      header("HTTP/1.1 500 Error");
      var_dump($statement->errorInfo());
      exit ('Bad SQL');
  }
  ```

  - [ ] Handle the results of the query (if any)

  ```php
  $db = new PDO(DB_CONNECT, DB_USER, DB_PASSWORD);
  
  $statement = $db->prepare('SELECT * FROM StockPrice LIMIT 1');
  $success = $statement->execute();
  
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
  
    - So for each row returned in our query, this code creates a new
      `StockPrice` object and adds it to the output array.
    
    - It loops, so long as a row exists in the result set. (Explain `while`)
    
    - Each row of the result set gets stored in `$row`, which is a PHP
      associative array. (Similar to arrays in Javascript.) If you're familiar
      with other programming languages, it's really an ordered map, but we call
      them arrays in PHP.
    
  - [ ] Test whether it works.
