(function(){
    'use strict';

    // var app = angular.module('app',[]);
//
//     app.controller('MasterToolController', function($http){
//         var vm = this;        //a good practice in case the object this is used in another scope
//
//         const ENDPOINT = "api/";
//
//         vm.title = 'Master Tool List' ;
//         vm.masterTools = [];
//
//         vm.newMasterTool = {
//             id: '',
//             name: '',
//             description: '',
//             price: null,
//             weight: null
//         };
//
//         vm.loadMasterTool = function(){
//             console.log("Start loading data from API");
//
//             $http.get(ENDPOINT + '/MasterTools.php')
//             .then(
//                 function successCallback(response) {
//                     // Process data
//
//                     console.log(response.data);
//                     vm.masterTools = response.data;
//                 },
//                 function errorCallback(err) {
//                     console.log("ENDPOINT " + ENDPOINT + " returns an error message: " + err.data);
//                 }
//             );
//         };
//
//         vm.addMasterTool = function() {
//             console.log('New Product: ' + vm.newMasterTool.id + "-" + vm.newMasterTool.name);
//
//             $http.post(
//                 ENDPOINT + 'MasterTool/create.php',
//                 JSON.stringify(vm.newMasterTool)
//             )
//             .then(function (response) {
//                 // Refresh all data instead of pushing locally
//                 vm.loadMasterTool();
//             })
//             .catch(function (err) {
//                 console.log("ENDPOINT " + ENDPOINT + 'MasterTool/create.php' + " returns an error message: " + err.data);
//             });
//
//             //refresh the model after insert
//             vm.newMasterTool = {
//                 id: '',
//                 name: '',
//                 description: '',
//                 price: null,
//                 weight: null
//             };
//         };
//
//         vm.deleteMasterTool = function(){
//
//             if(vm.deleteMasterToolId != null){
//                 var selectedMasterTool = new MasterTool(vm.deleteMasterToolId,
//                                                         null,
//                                                         null,
//                                                         null,
//                                                         null);
//
//                 $http.post(ENDPOINT + 'MasterTool/delete.php', JSON.stringify(selectedMasterTool))
//                     .then(function (response) {
//                         vm.loadMasterTool();
//                     })
//                     .catch(function (err) {
//                         console.log("ENDPOINT " + ENDPOINT + 'MasterTool/delete.php' + " returns an error message: " + err.data);
//                     });
//
//                 vm.deleteMasterToolId = null;
//             }
//         };
//
//         vm.loadMasterTool();
//     });

    // Define the `phonecatApp` module
    var userApp = angular.module('userApp', []);

    // Define the `UserController` controller on the `phonecatApp` module
    userApp.controller('UserController', function UserController($http) {
        var self = this;  //a good practice in case the object this is used in another scope

        self.list = [];
    
        self.loadList = function(){
            console.log("Start loading data from API");

            $http.get('api/Steve/list.php')
            .then(
                function successCallback(response) {
                    console.log(response.data);
                    self.list = response.data;
                },
                function errorCallback(err) {
                    console.log("ERROR: Endpoint 'Steve/list.php' returned an error: " + err.data);
                    // In a perfect world, do other error handling here
                }
            );
        };
    
        self.currentUser = {};
        self.getUser = function(id) {
            
            // Move around class names to show highlight
            $('.activeUser').removeClass('activeUser');
            $('#user'+id).addClass('activeUser');
            
            
            // This is how to do it if all data is already loaded
            self.currentUser = self.list.find(function(user){return user.id === id;});
        
            console.log(id, self.currentUser);
        };
        
        self.newUser = {
            firstName: '',
            lastName: '',
            email: '',
            descripiton: ''
        };
        
        self.addUser = function() {
            console.log('New User: ' + self.newUser.firstName + " " + self.newUser.lastName);

            $http.post(
                'api/Steve/create.php',
                self.newUser
            )
            .then(function (response) {
                // Refresh all data instead of pushing locally
                self.loadList();
            })
            .catch(function (err) {
                console.log("ERROR: Enddpoint 'Steve/create.php' returned an error: " + err.data);
            });

            //refresh the model after insert
            self.newUser = {
                firstName: '',
                lastName: '',
                email: '',
                descripiton: ''
            };
        };
        
        self.loadList(); // Now that it's been previously defined, don't forget to run it!
    });

})();