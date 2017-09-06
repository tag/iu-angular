# Intro to AngularJS

  - [ ] First, we need to know a bit about Javascript.

    - Can be written inline within and HTML document
    - Add script inline in `index.html` and demo `alert()` and `console.log()`
      
    ```js
    <script type="text/javascript">
        alert('hello world');
        console.log('hello world again');
    </script>
    ```
    
    - Can be written in a seperate file and referenced just like CSS
    - Add a `js` folder and Javascript file named `demo.js`
    - Add a refrence to the file (add at the bottom of the body for this example)
    
    ```js
        <script src="js/demo.js" type="text/javascript"></script>
    ```

  - [ ] JavaScript Interaction with the DOM

    - Demonstrate DOM manipulation within `demo.js`
       
    ```js
        document.getElementById('welcomeMsg').innerHTML = 'Hello World From JavaScript!!!';

        var msg = document.getElementById('welcomeMsg');
        msg.style.color = '#00FF00';
        msg.style.fontSize = '50px';
    ```

  - [ ] Download AngularJS
    
    - Download the package and extract angular.js from https://angularjs.org/
    - Alternatively, use the CDN reference
    - Add Angular to project; create a `js` folder and copy in the `angular.js`

  - [ ] Reference Angular. Open `index.html` and create a reference to 
    `angular.js` using script tag (or the CDN reference)

    ```js
    <script src="js/angular.js" type="text/javascript"></script>
    ```

  - [ ] Test Angular: in `index.html`, add `ng-app` attribute to a div and test angular

    ```html
    <div ng-app>test angular setup {{ 2+2 }}</div>
    ```

  - [ ] Scope of Angular in the DOM 

    - Try to add the same `{{2+2}}` snip elsewhere on the page. What happens?
    - **TIP:** move the `ng-app=""` to `<body>` to expand the scope to the whole document body
    
    ```html
    <body ng-app="app">
    ```

  - [ ] Create the `index.app.js` file
    
    - Create a new file `index.app.js` inside the `js` folder, and dump the following code:
    
    ```js
    (function(){
        'use strict';
        console.log("Hello World from app.js");
    })();
    ```
    
    - This is a [IIFE function](https://en.wikipedia.org/wiki/Immediately-invoked_function_expression),
      an "Immediately Invoked Function Expression"
    
    - In `index.html`, create a script tag that references the new `js/index.app.js` file:
    
    ```js
    <script src="js/index.app.js" type="text/javascript"></script>
    ```
    
    - Reload `index.html` in the broswer to test
    
  - [ ] Create module and controller
    
    ```js
    (function(){
        'use strict';
        console.log("Hello World from app.js");
        
        var app = angular.module('app',[]); //array has dependency; this create a module called app
                                            //angular.module('app'); will look up a module called app

        app.controller('AppController', function(){

            var self = this;
            console.log("I am in AppController");
            self.name = 'Facebook';
            self.ticker = 'FB';
            self.location = 'Menlow Park, CA, USA';
        });
        
    })();
    ```
    
    - We've named the Angular app (`app`), and now need to update the `ng-app` attribute in `<body>`
    
    ```html
    <body ng-app="app">
    ```
    
  - [ ] Create a new div in `index.html`, wire it to `AppController`, and test 
    
    ```html
       <div ng-controller="AppController as AppCtrl">
            <h3>{{ AppCtrl.name }} ({{AppCtrl.ticker}})</h3>
            <p>{{ AppCtrl.location }}</p>
        </div>
    ```
