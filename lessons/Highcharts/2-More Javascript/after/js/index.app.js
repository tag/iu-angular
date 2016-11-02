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
    
    app.controller('TickerController', function($http) {
   
        var self = this;
        console.log("I am in TickerController");
                        
        self.tickerData = [];
        
        self.getTickerData = function() {
            $http.get('api/StockPrice.php')
            .then(
                function successCallback(response) {
                    self.tickerData = response.data
                },
                function errorCallback(err) {
                    console.log(err);
                }
            );
            
        }
        
        // Run this once when the page loads
        self.getTickerData();
        
        self.newTickerData = {
            ticker:  '',
            date:    '',
            open:     0,
            close:    0,
            adjClose: 0,
            high:     0,
            low:      0,
            volume:   0
        };

        self.addTickerData = function() {
            console.log("Adding!");
            
            $http.post(
                'api/StockPrice/create.php',
                self.newTickerData
            ).then(
                function successCallback(response) {
                    self.getTickerData();
                  
                    self.newTickerData = {
                        ticker:  '',
                        date:    '',
                        open:     0,
                        close:    0,
                        adjClose: 0,
                        high:     0,
                        low:      0,
                        volume:   0
                    }; 
                },
                function errorCallback(err) {
                    console.log("ERROR", err);
                }
            );
        };
    });
})();