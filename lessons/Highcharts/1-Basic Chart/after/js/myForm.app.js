(function(){
    'use strict';
    
    var app = angular.module('app',[]); 
    
    app.controller("StockPriceController", function($http) {
        var self = this;
        self.data = [];
        
        self.formData = {
            ticker: '',
            startDate: '',
            endDate: ''
        };
        
        self.handleForm = function () {
        
            $http.get(
                'api/StockPrice/byDate.php',
                {
                    params: self.formData
                }
            ).then(
                function successCallback(response) {
                    console.log("It worked!", response.data);
                    self.data = response.data;
                    self.loadChart();
                },
                function errorCallback(err) {
                    console.log("ERROR", err);
                }
            );
        };
        
        ////
        // A function to load the chart
        ////
        self.loadChart = function() {
            
            // Some basic error checking, so that we don't try to create 
            // a chart if there is no data.
            if (self.data.length < 0) {
                return;
            }
            
            var ticker = self.data[0].ticker;
            
            var dates = self.data.map(function(currentValue, index, arr) {
                return currentValue.date;
            });
            
            var closeValues = self.data.map(function(currentValue, index, arr) {
                // In order to be charted, the value MUST be a Number type
                // (Highcharts doesn't auto-convert)
                return Number(currentValue.close);
            });
            
            console.log('Highcharts dates', dates);
            console.log('Highcharts values', closeValues);
            
            var myChart = Highcharts.chart('myChart', {
                    title: {
                        text: 'Close Prices for ' + ticker,
                        x: -20 //center
                    },
                    subtitle: {
                        text: 'From ' + dates[0] + ' to ' + dates[dates.length-1]
                    },
                    xAxis: {
                        categories: dates
                    },
                    yAxis: {
                        title: {
                            text: 'Close Price ($)'
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
                        name: ticker,
                        data: closeValues
                    }]
                }
            ); // end myChart
        }; // end loadChart() 
                
    });
})();
