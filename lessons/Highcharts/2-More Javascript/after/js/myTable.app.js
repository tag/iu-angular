(function(){
    'use strict';
    
    var app = angular.module('app',[]); 
    
    app.controller("StockPriceController", function($http) {
        var self = this;
        self.data = [];
        self.filteredData = [];
        
        self.currentTicker = '';
        self.tickerList = [];
        
        $http.get('api/StockPrice.php')
        .then(
            function successCallback(response) {
                console.log("It worked!", response.data);
                self.data = response.data;
                
                self.currentTicker = '';
                self.tickerList = [];  // Clear it before we start
                self.data.forEach(
                    function (current) {  
                        // console.log(current);

                        // Is current ticker in list? If not, add it
                        if (self.tickerList.indexOf(current.ticker) === -1) {
                            self.tickerList.push(current.ticker)
                        }
                    }
                );
                
                self.onTickerSelect();
                
                console.log("Tickers",  self.tickerList);
                
                self.buildChart();            
            },
            function errorCallback(err) {
                console.log("ERROR", err);
            }
        );
        
        self.onTickerSelect = function() {
            console.log("onTickerSelect()", self.currentTicker);

            if (self.currentTicker === '') {
                self.filteredData = self.data;
            } else {
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
            self.buildChart();
        };
        
        self.buildChart = function () {
            // In a "real" app, we might do this differently, precalculting and caching the conversion from `data`  to `series`
            //
            // We do dates differently than the previous page, partly because dates are repeated across ticker symbols,
            // and partly because this page uses the 'datetime' data type in Highcharts. (In order to do this, I added
            // a parseDate method to convert the JSON date to a Javascript Date object,)
            //
            
            // How the data will be restructured:
            // e.g., { "GOOG": {"close": [ [2016-09-01, 55], ... ], "open": [...]}, ...}
            // ... and each of the close/open/etc arrays will be arrays of 
            // [date, value], where date is a valid Javascript `Date` object.
            var series = {};
            
            self.data.forEach(function(current) {
                if (series[current.ticker] === undefined) {
                    series[current.ticker] = {open:[], close:[], high:[], low:[], range: [], openclose: []};
                }
                
                var date = parseDate(current.date);

                // Use `unshift` (add to front) instead of `push` (add to end) to keep data sorted
                // series[current.ticker].open.unshift ( [date, Number(current.open )] );
                series[current.ticker].close.unshift( [date, Number(current.close)] );
                // series[current.ticker].high.unshift ( [date, Number(current.high )] );
                // series[current.ticker].low.unshift  ( [date, Number(current.low  )] );
                
                
                // Made low–high a range series, rather than a line.
                series[current.ticker].range.unshift( [date, Number(current.low), Number(current.high)] );
                series[current.ticker].openclose.unshift( [date, Number(current.open), Number(current.close)] );

            });
            
            // DEBUG (if necessary)
            // console.log("series",series);
            
            // `series` holds the transformed structure, while `seriesData` uses the
            // transformed structure to format the data better for Highcharts.
            // Think of `series` as an interim step in the transformation. It's
            // usefule because this function actually displays different kinds of 
            // charts, depending on the valud of self.currentTicker
            
            var seriesData = [];
            
            if (self.currentTicker == '') { // chart all
                seriesData = Object.keys(series).map(function(curr) {
                    return {
                        name: curr,
                        data: series[curr].close
                    }; 
                });
            } else { // chart a single stock
                console.log(Highcharts.getOptions().colors[0]);
                seriesData = [
                    {
                        name: 'Close',
                        type: 'spline',  // curved, rather than straight line
                        data: series[self.currentTicker].close
                    },
                    {
                        name: 'Daily Range',
                        type: 'arearange', // arearange requires highcharts-more.js file as well.
                        data: series[self.currentTicker].range,
                        color: Highcharts.getOptions().colors[0],
                        fillOpacity: 0.2,
                        lineWidth: 0,
                        zIndex: 0   // moves the range to the back, so the other values can be selected.
                    },
                    {
                        name: 'Open/Close',
                        type: 'columnrange', // arearange requires highcharts-more.js file as well.
                        data: series[self.currentTicker].openclose,
                        color: 'rgba(124,181,236,.4)',
                        borderWidth: 0,
                        zIndex: 0
                    }
                ];
            }
            
            console.log(seriesData);
            
            Highcharts.chart('myChart', {
                    title: {
                        text: 'Stock Prices',
                    },
                    subtitle: {
                        text: 'Pretty Subtitle',
                    },
                    xAxis: {
                        type: 'datetime', // Note we've changed the type, instead of using categories
                        dateTimeLabelFormats: {
                            day: '%m/%d/%y'
                        },
                        minTickInterval: 24 * 3600 * 1000 // one day, expressed in milliseconds;
                                                          // without this, Highcharts sets its own, 
                                                          // which could be on the hourly level
                    },
                    yAxis: {
                        title: {
                            text: 'Price'
                        },
                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }]
                    },
                    tooltip: {
                        valuePrefix: '$',
                        shared: true,
                        crosshairs: true
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle',
                        borderWidth: 0
                    },
                    series: seriesData
                });  
        }
    });
})();


// parse a date in yyyy-mm-dd format
function parseDate(input) {
  var parts = input.split('-');
  // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
  return Date.UTC(parts[0], parts[1]-1, parts[2]); // Note: months are 0-based
}