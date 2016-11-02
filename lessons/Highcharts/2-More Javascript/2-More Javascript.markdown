#2-More Javascript

  - [ ] Our goal is to show some filters of the table in `myTable.html`, so that only one stock is shown at a time.
  
  - [ ] We need two things: a variable to hold state (the currently selected ticker), and a variable that holds the available ticker symbols.
    
    ```js
    // Inside the Controller
    
    self.currentTicker = '';
    self.tickersList = [];
        
    ```
    
    ```js
    // Inside the success callback, after data has been fetched
    // ... after self.data has been populated
    
    self.tickersList = [];  // Clear it before we start
    self.data.forEach(
        function (current) {  
            // Is current ticker in list? If not, add it
            if (self.tickersList.indexOf(current.ticker) === -1) {
                self.tickersList.push(current.ticker)
            }
        }
    );
    
    ```
    
    - `[Array.forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)`
       is very similar to `Array.map()`, except that no return value is tracked.
  
  - [ ] Create a `<select>` dropdown to hold the currently selected ticker
    
    - The `ngModel` is necessary to use `ngChange`
    
    ```html
    <select ng-change="spCtl.onTickerSelect()" ng-model="spCtl.currentTicker">
        <option value="">-- ALL --</option>
        <option ng-repeat="tick in spCtl.tickersList" value="{{tick}}">{{tick}}</option>
    </select>
    ```
    
    ```js
    // Inside the Controller
    
    // For now, just demo the `onChange()` callback is working
    self.onTickerSelect = function() {
        console.log("onTickerSelect()", self.currentTicker);
    }
    ```
    
  - [ ] Modify the table to show only data of the selected ticker symbol
    
    - Flesh out the `onChange` function to create a filtered copy of the array
    
    ```js
    // Remember to also declare
    // self.filteredData = []
    // ... previously in the Controller
    
    self.onTickerSelect = function() {
        console.log("onTickerSelect()", self.currentTicker);
        
        if (self.currentTicker === '') {
            self.filteredData = self.data;
            return;
        }
        
        self.filteredData = self.data.filter(
            function (current) {
                return current.ticker == self.currentTicker;
                
                // The above line is functionally the same as the following:
                // if (current.ticker == self.currentTicker) {
                //     return true;
                // }
                // return false;
            }
        );
    }
    ```
    
    - The `[Array.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)`
      function accepts a function that is run against each row. If the function
      returns `true`, the row is kept in the returned result set. If it returns
      `false`, the row is discarded.
    
    - Change the model used to repeat the table to `filteredData`
    
    - Test. The table is blank on page load. This is not what we want.
    
    - Call the `onTickerSelect()` function in the success callback
    
      ```js
      self.currentTicker = '';
      self.onTickerSelect();
      ```
  
  - [ ] Now the hard part: displaying a chart. In order for the chart to be dynamic, the data structure must change structure. Currently the data looks like this:
        
        ```js
        [
            {
                "ticker": "GOOG", "date": "2016-09-16", "close":"768" // ... SNIP 
            },
            {
                "ticker": "GOOG", "date": "2016-09-15", "close":"771" // ... SNIP
            }
            // ... SNIP ...  
        ]
        ```
        but it needs to look like this
        ```js
        [{
                    name: 'GOOG',
                    data: [762, 771, 768]
                }, {
                    name: 'MSFT',
                    data: [57, 57, 56]
                }
                // ... SNIP
                ]
        ```
        
  - [ ] Prepare to create a chart
    
    - Add the Highscharts script, add a target `<div>` and make an empty 
      (or dummy) `buildChart()` function, as described in the previous lesson.
    
    - Call `buildChart()` in the web service success callback.
    
    - Test!
    
    
    
      
     
    
    