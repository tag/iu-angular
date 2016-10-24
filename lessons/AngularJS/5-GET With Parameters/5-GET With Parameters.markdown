#5 - GET With Parameters (and review)

  - [ ] REVIEW: Make a js controller for `myForm.html`
    
    - Copy/paste from `myTable.app.js` to new file `myForm.app.js`
    
    - Add necessary components to `myForm.html`:
    
      1. AngularJS `<script>` file tag
      2. Local application `<script>` file tag
      3. `ngApp` directive
      4. `ngController` directive
    
    - Create a variable in the app to hold the form values, and bind it 
      to the HTML form. (`ngModel`)
      
    - Create `ngSubmit` handler (look at `index.app.js` for a hint).
    
    - Have the form handler request data from `api/StockPrice/byDate.php`
    
    - What sort of data will be returned? Use `ngRepeat` to output.
      (This can be mostly copied from `myTable.html`)
    
  - [ ] [`$http.get()`](https://docs.angularjs.org/api/ng/service/$http#get) takes
    a second paramter, an "options" object. Pass the JSON data to the `params` 
    key to have Angular automagically prep the GET parameters.
    
    ```js
    $http.get(
        'api/StockPrice/byDate.php',
        {
            params: self.formData
        }
    ).then(
        // ...
    );
    ```
    
    - NOTE: You'll need to use the `text` type for the date input, rather than 
      the `date` type, as the browser may add extra timezone information to the
      input value

  - [ ] The `ngShow` directive (and it's companion, `ngHide`) is useful to 
        dynamically show/hide content, depending on the bound value. When the 
        variable has a "truthy" value, the element will be shown; when it has a
        "falsey" value, it will be hidden. (And vice versa for `ngHide`).
        
        ```html
        <table ng-show="spCtl.data.length" ...>
        ```
        
        - Falsey values in Javascript include `0`, null, and the empty string `''`
          Objects (including empty arrays) are always truthy.
        
        - [More on truthy/falsey values](http://james.padolsey.com/javascript/truthy-falsey/)

  - [ ] `<select>` and `<option>` tags in a form
      
  - [ ] HOMEWORK: Write a PHP API file that returns an array of the ticker 
        symbols in the database. Call the file using an `$http.get` request
        on page load. Change the form's ticker `<input>` to a `<select>`
        