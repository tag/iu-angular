(function(){
    'use strict';
    
    var app = angular.module('app',[]); 
    
    app.controller("StockPriceController", function($http) {
        var self = this;
        self.data = [];
        
        self.formData = {
            ticker: '',
            date: ''  //Your version might need startDate & endDate
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
                },
                function errorCallback(err) {
                    console.log("ERROR", err);
                }
            );
        }
    });
})();
