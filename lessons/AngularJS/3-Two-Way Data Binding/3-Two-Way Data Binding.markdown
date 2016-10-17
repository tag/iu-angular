#3 - Two-Way Data Binding

  - [ ] Exercise: Build a form necessary to add a new row
  
    - Hint: Use the HTML5 input types where appropriate
    - Hint: Use the Bootrap documentation for a simple form example

  - [ ] Solution: Add the following code to `index.html`
  
    - We could use the `date` type for the respective field, but it
      might cause us some issues later.
	
    ```html
        <form>
          <div class="form-group">
            <label for="inpTicker">Ticker</label>
            <input type="text" class="form-control" id="inpTicker">
          </div>
          <div class="form-group">
            <label for="inpDate">Date</label>
            <input type="text" class="form-control" id="inpDate" placeholder="YYYY-MM-DD">
          </div>
          <div class="form-group">
            <label for="inpClose">Close</label>
            <div class="input-group">
              <span class="input-group-addon">$</span>
              <input type="number" class="form-control" id="inpClose" min="0">
            </div>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        ```

  - [ ] Add new data fields to controller in `index.app.js`

    ```js
    // Inside the TickerController ...
    
    self.newTickerData = {
        ticker: '',
        date: '',
        close: 0
    };
    ```
    
  - [ ] Use `ng-model` to map the controller data to the inputs' values

    - Make sure your form is in scope for the controller!
 
  - [ ] Add a form handler using `ng-submit`
    
    - We could also apply `ng-click` to the submit button, but
     [attaching to the submit handler is better](http://stackoverflow.com/questions/23553071/differences-between-ng-submit-and-ng-click)
  
    ```html
    <form ng-submit="tkCtrl.addTickerData()">
      <div class="form-group">
        <label for="inpTicker">Ticker</label>
        <input type="text" class="form-control" id="inpTicker" ng-model="tkCtrl.newTickerData.ticker">
      </div>
      <div class="form-group">
        <label for="inpDate">Date</label>
        <input type="text" class="form-control" id="inpDate" ng-model="tkCtrl.newTickerData.date">
      </div>
      <div class="form-group">
        <label for="inpClose">Close</label>
        <div class="input-group">
          <span class="input-group-addon">$</span>
          <input type="number" class="form-control" id="inpClose" min="0" ng-model="tkCtrl.newTickerData.close">
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>    
    ```	

  - [ ] Add the submit handler to the controller in `index.app.js`
	
	```js
    self.addTickerData = function() {
        console.log("Adding data!");
    }
    ```
    
	- Test to see if the the handler function is properly wired and login to the console. 
	
  - [ ] Update the handler
    
    - Add (push) the new ticker data to the array
    - Reset `newTickerData`
    
    ```js
    self.addTickerData = function() {
        console.log("Adding new data!");
        
        // NOTE: This is not yet altering data on the server!
        self.tickerData.push(self.newTickerData);
        
        self.newTickerData = {
            ticker: '',
            date: '',
            close: 0
        };
    }
    ```

  - [ ] Test!
  
  ```text
  # Some sample data
  FB   2016-09-01  126.17
  FB   2016-09-02  126.51
  FB   2016-09-06  129.73
  ```
