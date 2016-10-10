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
    
})();