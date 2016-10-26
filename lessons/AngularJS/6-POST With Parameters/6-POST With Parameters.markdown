#6 - POST With Parameters (and review)

  - [ ] REVIEW: What is a POST body?
    
    - POST bodies are typically url-form-encoded, but Angular sends raw JSON

## PHP    
  - [ ] Adapt our PHP API files to translate POST-ed JSON:
  
  ```PHP
  // In app/environment.php
  
  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
      $contentTypes = explode(';', $_SERVER['CONTENT_TYPE']); //parse content_type headers
      if ($contentTypes[0] == 'application/json') {
          $_POST = json_decode(file_get_contents('php://input'), true);
      }
  }
  ```
  
  - [ ] With this change, sending POST web service requests from Angular
        is largely similar to sending GET requests. Use the `data` parameter
        in the options hash instead of `params`:
        
    ```js
    $htttp.post( 
        'api/StockPrice/create.php',
        {
            data: self.formData
        }
    ). then(
        // ...
    );
    ```
    
  - [ ] Add file `api/StockPrice/create.php`

  - [ ] Review HTTP methods GET and POST, and "superglobals" `$_GET`, `$_POST`

  - [ ] Adapt to reading in data from Angular

    - By default, Angular sends POST data as JSON, rather than
      url-encoded, which is what PHP expects by default. (POST bodies typically
      look like `id=1&name=Micron&price=53`) We can either make a tweak to our js
      file or make an adjustment on the server side. Let's modify the incoming
      POST data.
    
    - It may be easiest to just grab the `environment.php` file
      from the `after` folder, but they need to add the following code:
    
      ```php
      // FILE: php-app/environment.php
    
      if ($_SERVER['REQUEST_METHOD'] === 'POST') {
          $contentTypes = explode(';', $_SERVER['CONTENT_TYPE']); //parse content_type headers
          if ($contentTypes[0] == 'application/json') {
            $_POST = json_decode(file_get_contents('php://input'), true);
          }
      }
      ```
    
    - The above code checks the request method, and if it's POST, and if the
      content type is `application/json`, then it parses the input as JSON.
    
    - Now we can use `$_POST` normally with Angular. If the POST body is JSON, 
      this PHP code will populate the `$_POST` variable, which would normally
      occur automatically. If the POST body is url-encoded, `$_POST` continutes
      to be populated magically by PHP.
  
  - [ ] Angular tries to be helpful and prevent cross-site scripting (XSS). If
      we're testing the connection between our HTML code from somewhere other
      than the local server, it won't work. (We could modify our server code
      to be more permissive, but we won't, partly for security reasons.)
  
  - [ ] Read in the POST data, and create a StockPrice object

    ```php
    // FILE: php-app/MasterTool/create.php
    
    $obj = new StockPrice (
        $_POST['ticker'],
        $_POST['date'],
        $_POST['open'], 
        $_POST['high'],
        $_POST['low'],  
        $_POST['volume'], 
        $_POST['close'],  
        $_POST['adjClose']
    );
    ```
  
  - [ ] Review the steps to working with database in PHP:
      
      1. Create a connection
      2. Prepare a statement
      3. Execute (with parameters)
      4. Handle the result set

  - [ ] Open a db connection, and prepare the SQL
  
    ```php
    // FILE: php-app/StockPrice/create.php
    
    $db = new PDO(DB_CONNECT, DB_USER, DB_PASSWORD);
    
    $sql = 'INSERT INTO StockPrice '
       . '(ticker, date, open, high, low, volume, close, adjClose) '
       .' VALUES (?,?,?,?,?,?,?,?)';
     
    $success = $statement->execute(
        array(
            $obj->ticker,
            $obj->date,
            $obj->open, 
            $obj->high,
            $obj->low,  
            $obj->volume, 
            $obj->close,  
            $obj->adjClose
        )
    );
    ```
  
  - [ ] Parameterized queries: Explain (again) the ? marks in the above
    statement, and how the parameters get passed as an array to `execute()`.
    
    - Mention SQL injection again
    
    - DO NOT EVER simply append inputs to a query.
  
  - [ ] Handle the query results
  
    ```php
    // FILE: php-app/StockPrice/create.php
    
    if (!$success) { // If something went wrong with our db statement
        header("HTTP/1.1 500 Error");
        var_dump($statement->errorInfo());
        exit;
    }
    
    echo json_encode($obj);
    ```

  - [ ] Encourage students to build a delete page on their own. (It's almost
        exactly the same.) An example is included in the "after" folder.

## HTML/AngularJS

  - [ ] Modify the form on `index.html` to include all of the required fields.
    
    - Something similar to the following for each of ticker, date, open, 
      close, adjusted close, high, low, and volume:
      
      ```html
      <!-- FILE: index.html-->
      
      <div class="form-group">
        <label for="inpClose">Open</label>
        <div class="input-group">
          <span class="input-group-addon">$</span>
          <input type="number" class="form-control" id="inpClose" min="0" ng-model="tkCtrl.newTickerData.open">
        </div>
      </div>
      ```
  
  - [ ] Modify our bound variables in the js file too.
  
    ```js
    // FILE: js/index.app.js
    // This code needs to be in two places
    
    self.newTickerData = {
        ticker:  '',
        date:    '',
        open:     0,
        close:    0,
        adjClose: 0,
        high:     0,
        low:      0,
        volume:   0
    };
    ```
  
  - [ ] Instead of simply pushing the data to the local array, modify the form 
        handler to POST to our API.

  - [ ] Unlike `$http.get()`, the second paramter of `$http.post()` is the data
        to be POSTed. (As opposed to a hash of configuration options.)
        
    ```js    
    // FILE: index.app.js
    
    self.addTickerData = function() {
      console.log("Adding!");
        
        $http.post(
            'api/StockPrice/create.php',
            self.newTickerData
        ).then(
            function successCallback(response) {
                //TODO: Reload data
                
                self.newTickerData = {
                    ticker:  '',
                    date:    '',
                    open:     0,
                    close:    0,
                    adjClose: 0,
                    high:     0,
                    low:      0,
                    volume:   0
                }; 
            },
            function errorCallback(err) {
                console.log("ERROR", err);
            }
        );
    };
    ```
    
  - [ ] Because of how we wrote our GET API, it might not be easy to confirm 
        the POST worked.
        
        - Let's change the GET API to return the most recent results for a
          ticker symbol:
        
        ```PHP
        // FILE: api/StockPrice.php
        
        // Warning: This returns *many* rows without the LIMIT!
        $statement = $db->prepare('SELECT * FROM StockPrice ORDER BY date DESC LIMIT 10'); 
        ```
        
  - [ ] The index file should show dynamic data, rather than static data:
  
  
  