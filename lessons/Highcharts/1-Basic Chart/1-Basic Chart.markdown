#1-Basic Chart

  - [ ] Introduce [Highcharts](https://highcharts.com)
  
  - [ ] Discuss Highcharts [license](), 
        [demos](http://www.highcharts.com/demo), 
        [documentation](http://www.highcharts.com/docs)
    
    - If you wish to [download](http://www.highcharts.com/download), you may.
  
      
  - [ ] Many of the examples in the demos are great. Find one you want,
        then view its code.
        
    - Look at the [simple line chart](http://www.highcharts.com/demo/line-basic)
    
  - [ ] Create our first chart
    
    - Add the Highcharts library to `myForm.html` (load from their CDN)
    
    ```html
    <script src="https://code.highcharts.com/highcharts.js"></script>
    ```
    
    - Add a div to `myForm.html` to contain the chart. Give it an `id`.
    
    ```html
    <div id="myChart"></div>
    ```
    
    - In `myForm.app.js`, create an empty function for loading the chart.
    
    ```js
    var self.loadChart = function() {
        // TODO
    };    
    ```

    - Copy the demo code for the line chart into the body of our empty function.
      Copy everything but the first and last lines from the 
      [fiddle](http://jsfiddle.net/gh/get/jquery/1.9.1/highslide-software/highcharts.com/tree/master/samples/highcharts/demo/line-basic/).
      (The lines we're skipping are jQuery stuff that we don't need)
      
    - Change the name of the target div, and assign the chart to a variable:
    
    ```js
    self.loadChart = function() {
        var myChart = Highcharts.chart('container', {
                title: {
                    text: 'Monthly Average Temperature',
                    x: -20 //center
                },
                subtitle: {
                    text: 'Source: WorldClimate.com',
                    x: -20
                },
                xAxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                },
                yAxis: {
                    title: {
                        text: 'Temperature (°C)'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    valueSuffix: '°C'
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                series: [{
                    name: 'Tokyo',
                    data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
                }, {
                    name: 'New York',
                    data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
                }, {
                    name: 'Berlin',
                    data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
                }, {
                    name: 'London',
                    data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
                }]
            });
    };
    
    self.loadChart();   
    ```
    
    - Test. We have a working chart! There is an issue, though: some of the
      characters aren't displaying properly. This is an encoding issue. The
      HTML page should be set as UTF-8, but it isn't. Let's add some cleanup:
      
      ```html
      <head>
          <meta charset='utf-8'>
          <!-- SNIP -->
      </head>
      ```
      
    - We really should set the encoding of the API files too, although this is 
      a rarer bug.
      
      ```php
      // In app/environment.php:
      
      // This annouces our content as JSON, and tells the browser which encoding to use
      header('Content-Type: application/json; charset=utf-8');
      ```
      
    - Test by reloading the page. Everything works!
    
  - [ ] Hook the chart to our data.
  
  - [ ] Examine and discuss the chart configuration hash.
    
    - Notice the `x-Axis` and `series` options
    
    - This is not the format our API is delivering data. Thus, we have two options
    
      1. Modify our API to return data this way (not always possible)
      
      2. Adjust our data locally.
  
  - [ ] One tool we can use in Javascript is the 
        [`Array.map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) function.
        
    ```js
    var ticker = self.data[0].ticker;
    
    var dates = self.data.map(function(currentValue, index, arr) {
        return currentValue.date;
    });
    
    var closeValues = self.data.map(function(currentValue, index, arr) {
        // In order to be charted, the value MUST be a Number type
        // (Highcharts doesn't auto-convert)
        return Number(currentValue.close);
    });
    ```
    
      - Note the bug fix in the above code, casting the close values as 
        numbers, instead of strings
      
  - [ ] Make changes so that the code is called after the web service call returns
    
    - Call the create chart method in the `successCallback` of the `then()` block
