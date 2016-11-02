(function(){
    'use strict';
    
    var app = angular.module('app',[]); 
    
    app.controller("StockPriceController", function($http) {
        var self = this;
        self.data = [];
        self.filteredData = [];
        
        self.currentTicker = '';
        self.tickersList = [];
        
        $http.get('api/StockPrice.php')
        .then(
            function successCallback(response) {
                console.log("It worked!", response.data);
                self.data = response.data;
                
                self.tickersList = [];  // Clear it before we start
                self.data.forEach(
                    function (current) {  
                        console.log(current);

                        // Is current ticker in list? If not, add it
                        if (self.tickersList.indexOf(current.ticker) === -1) {
                            self.tickersList.push(current.ticker)
                        }
                    }
                );
                self.currentTicker = '';
                self.onTickerSelect();
                
                console.log("Tickers",  self.tickersList);
                
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
        };
        
        self.buildChart = function () {
            
            // We have to do dates differently than the previous page, because dates are repeated.
            
            var theDates = [];
            
            var series = {};
            
            self.data.forEach(function(current) {
                if (theDates.indexOf(current.date) == -1) {
                    // unshift (add to front) instead of push (add to back) , so we don't have to sort later
                    theDates.unshift(current.date);
                }
                    
            });
            
            
                
            Highcharts.chart('myChart', {
                    title: {
                        text: 'Stock Prices',
                    },
                    subtitle: {
                        text: 'Pretty Subtitle',
                    },
                    xAxis: {
                        categories: theDates
                    },
                    yAxis: {
                        title: {
                            text: 'Prices'
                        },
                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }]
                    },
                    tooltip: {
                        valuePrefix: '$'
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
        }
    });
})();
