#2-More Javascript

  - [ ] Our goal is to show some filters of the table in `myTable.html`, so that only one stock is shown at a time.
  
  - [ ] We need two things: a variable to hold state (the currently selected ticker), and a variable that holds the available ticker symbols.
    
    ```js
    // Inside the Controller
    
    self.currentTicker = '';
    self.tickerList = [];
        
    ```
    
    ```js
    // Inside the success callback, after data has been fetched
    // ... after self.data has been populated
    
    self.tickerList = [];  // Clear it before we start
    self.data.forEach(
        function (current) {  
            // Is current ticker in list? If not, add it
            if (self.tickerList.indexOf(current.ticker) === -1) {
                self.tickerList.push(current.ticker)
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
        <option ng-repeat="tick in spCtl.tickerList" value="{{tick}}">{{tick}}</option>
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
    
    - Flesh out the `onTickerSelect()` function to create a filtered copy of the array
    
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
    
    - `[Array.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)`
      accepts a function that is run against each row. If the function
      returns `true`, the row is kept in the returned result set, while if it returns
      `false`, the row is discarded.
    
    - Change the model used to repeat the table to `filteredData`
    
    - Test. The table is blank on page load. This is not what we want.
    
    - Call the `onTickerSelect()` function in the success callback
    
      ```js
      self.currentTicker = '';
      self.onTickerSelect();
      ```
    
    - Side note: all of what we've accomplished here with filtering could have
     been done using the `ngShow` directive. Indeed, that would have been 
     simpler. However, the point of this piece was to demonstrate 
     `Array.filter()` and `ngChange`. To use `ngShow` instead, remove the on 
     change handler entirely, and provide the Boolean logic to show the row
     (This method is not reflected in the "after" files):
     
     ```html
     <select ng-model="spCtl.currentTicker">
         <option value="">-- ALL --</option>
         <option ng-repeat="tick in spCtl.tickerList" value="{{tick}}">{{tick}}</option>
     </select>
     
     <!-- SNIP -->
     
     <tbody>
         <tr ng-repeat="row in spCtl.data" ng-show="row.ticker == spCtl.currentTicker || spCtl.currentTicker == ''">
             <td>{{row.ticker}}</td>
             <td>{{row.date}}</td>
             <td>{{row.close}}</td>
         </tr>
     </tbody>
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
    
  - [ ] Many more steps, not covered here (sorry). Look at the (well-commented) code in `after/js/myTable.app.js`
    
    
    
      
     
    
    