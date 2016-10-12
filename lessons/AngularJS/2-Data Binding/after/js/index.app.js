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
    
    app.controller('TickerController', function() {
   
        var self = this;
        console.log("I am in TickerController");
                        
        self.tickerData = [
            {"ticker":"AAPL","date":"2016-09-01","close":"106.730003"},
            {"ticker":"AAPL","date":"2016-09-02","close":"107.699997"},
            {"ticker":"AAPL","date":"2016-09-06","close":"107.730003"},
            {"ticker":"AAPL","date":"2016-09-07","close":"108.360001"},
            {"ticker":"AAPL","date":"2016-09-08","close":"105.519997"},
            {"ticker":"AAPL","date":"2016-09-09","close":"103.129997"}
        ];
    });
})();
