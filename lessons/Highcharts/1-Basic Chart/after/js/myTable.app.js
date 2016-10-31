(function(){
    'use strict';
    
    var app = angular.module('app',[]); 
    
    app.controller("StockPriceController", function($http) {
        var self = this;
        self.data = [];
        
        $http.get('api/StockPrice.php')
        .then(
            function successCallback(response) {
                console.log("It worked!", response.data);
                self.data = response.data;
            },
            function errorCallback(err) {
                console.log("ERROR", err);
            }
        );
    });
})();
