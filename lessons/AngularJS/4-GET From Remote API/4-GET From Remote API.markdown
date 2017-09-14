# 4-Simple GET From Remote API

  - [ ] (2016: Needs updating) To begin, we will need files from prevoius lessons. These are all collected in a `before.zip` file
    
    - `api/StockPrice/byDate.php` from PHP lesson #5 (and the supporting PHP files)
    - `myTable.html` from HTML lesson 3
    
  - [ ] (2016: Needs updating) Review the functionality of the form in `api/StockPrice.php`

    - Returns a subset of stock data, in JSON format
  
  - [ ] Review the four parts necessary for your Angular app to work:

    1. Load the angular.js library
    2. Load your local application Javascript file
    3. Add `ng-app` directive to an element on the HTML page (often, `<body>`)
    4. Add `ng-controller` directive to an element on the HTML page
    
  - Your code might look something like this:
  
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
    $http.get(url)
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
    
        var url = 'api/StockPrice.php';
        $http.get(url)
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
    
    If the API isn't built yet on the local machine, we can try to grab the data 
    [directly from this GitHub repo](https://raw.githubusercontent.com/tag/iu-angular/master/lessons/AngularJS/4-GET%20From%20Remote%20API/ticker.json) (we'll pretend it's a dynamic web service).
    
    ```js
    var url = 'https://raw.githubusercontent.com/tag/iu-angular/master/lessons/AngularJS/4-GET%20From%20Remote%20API/ticker.json';
    ```
    
  - [ ] EXERCISE: Create a new page. Connect to a public API, and present the data. Some suggested APIs:
  
    * Chuck Norris Jokes: [API](https://api.chucknorris.io/jokes/random)
    * [Random cat pictures](http://thecatapi.com): [API](http://thecatapi.com/api/images/get?format=src)
    
