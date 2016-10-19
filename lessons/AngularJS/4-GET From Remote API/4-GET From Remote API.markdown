#4-Simple GET From Remote API

  - [ ] To begin, we will need files from prevoius lessons. These are all collected in a `before.zip` file
    
    - `api/StockPrice/byDate.php` from PHP lesson #5 (and the supporting PHP files)
    - `myTable.html` from HTML lesson 3
    
  - [ ] Review the functionality of the form in `api/StockPrice.php`

    - Returns a subset of stock data, in JSON format
  
  - [ ] Review the four parts necessary for your Angular app to work:

    1. Load the angular.js library
    2. Load your local application Javascript file
    3. Add `ng-app` directive to an element on the HTML page (often, `<body>`)
    4. Add `ng-controller` directive to an element on the HTML page
  
  - [ ] Exercise: create a new application/controller AngularJS file for `myTable.html`
    
    - Create a table that prints stock data, much like we did in `index.html`
    - Mostly, this is a copy/paste from `index.app.js`
    - Name the new Angular application file `myTable.app.js`
    - An empty app & controller might look like this:
    
    ```js
    (function(){
        'use strict';
    
        var app = angular.module('app',[]); 
    
        app.controller("StockPriceController", function($http) {
            var self = this;
            // ... 
        });
    
    })();
    ```

  - [ ] LECTURE: GET & POST; what does an HTTP header look like? (See slides, posted separately)
    
    - Know what the "Promise" object is, and the general structure of the "response" object
  
  - [ ] Use `$http` to make AJAX calls
    
    - [`$http` is an Angular object](https://docs.angularjs.org/api/ng/service/$http) for making web service (AJAX) calls 
    
    - Need to pass in `$http` to the controller
      
    ```js
    app.controller("StockPriceController", function($http) {  // <--- need to pass $http in as a parameter to the controller
        // ...
    }
    ```
    
    - Use the `get()` shortcut method. `$http.get()` accepts a url as the first
      parameter, and returns a "promise" object. We'll "chain" methods, and 
      call the promise's `then()` method:
      
    ```js
    $http.get('api/StockPrice.php')
    .then(
        function successCallback(response) {
            // ...
        },
        function errorCallback(err) {
            // ...
        }
    );
    ```
    - When the `GET` request returns, (it's asynchronous, so we can't guarantee 
      when it will happen), the promise object runs either a success callback 
      or an optional error callback (the two functions we passed as parameters
      to the `then()` method.)
      
  - [ ] Inside the success callback, set the response body to the controller's
    `data` variable. Angular's binding magic takes care of the rest.
    
    ```js
    app.controller("StockPriceController", function($http) {
        var self = this;
        self.data = [];
    
        $http.get('api/StockPrice.php')
        .then(
            function successCallback(response) {
                console.log("It worked!", response.data);
                self.data = response.data;
            },
            function errorCallback(err) {
                console.log("ERROR", err);
            }
        );
    });
    ```
    