(function(){
    'use strict';

    // Define the `phonecatApp` module
    var userApp = angular.module('userApp', []);

    // Define the `UserController` controller on the `phonecatApp` module
    userApp.controller('UserController', function UserController($http) {
        var self = this;  //a good practice in case the object this is used in another scope

        self.list = [];
        self.showForm = false; // Whether to show/hide the update/create form
        
        // Load the list of users for the left hand menu
        self.loadList = function(){
            console.log("Loading list data from API");

            $http.get('api/Steve/list.php')
            .then(
                function successCallback(response) {
                    //DEBUG: console.log(response.data);
                    self.list = response.data;
                },
                function errorCallback(err) {
                    console.log("ERROR: Endpoint 'Steve/list.php' returned an error: " + err.data);
                    // In a perfect world, do other error handling here
                }
            );
        };
        self.loadList(); // Need to call this on page load, not just define it!
        
    
        // Stores a reference to the currently selected user
        self.currentUser = null;
        
        // Gets specific information about a select user from the API
        self.showUserDetails = function(id) {
            // DEBUG: console.log('Show User Details: ', id);
            
            // Hide the update/create form, if visible
            self.showForm = false;
            
            // Move around class names to show highlight
            $('.activeUser').removeClass('activeUser');
            $('#user' + id).addClass('activeUser');
            
            if (id === null) {
                self.currentUser = null;
                return;
            }
                
            // We could do an AJAX GET request here, but the data we need is already
            // loaded (self.list contains *all* of the data).
            // This is how to do it if all data is already loaded:
            // search the array for the clicked user
            self.currentUser = self.list.find(
                function(user) {
                    return user.id === id;
                }
            );
        };
        
        self.newUser = {
            firstName: '',
            lastName: '',
            email: '',
            description: ''
        };
        

        self.buttonText = "Update";
        self.handleFormSubmit = function() {
            // We have two possible actions for this form (create|update).
            // Checking the submit button text may not be the best approach,
            // but it will work.
            
            switch (self.buttonText) {
            case "Update":
                self.handleUpdateUserForm();
                return;
            case "Create":
                self.handleCreateUserForm();
                return;
            }
            
            alert("An unexpected error has occurred.");
            console.log("ERROR: Unknown form type!");
        }

        self.showUserForm = function(action) {
            switch(action) {
            case 'create':
                self.buttonText = "Create";
                self.showUserDetails(null);
                self.currentUser = self.newUser;
                $('#createButtonDiv').addClass('activeUser');
                break;
            case 'update':
                self.buttonText = "Update";
                // BUG: The current version of code has a bug whereby if 
                //      someone edits a user's fields, they persist in the 
                //      application until reload, even if not saved to the server.
                //      To fix, we need a separate variable to track form fields,
                //      so that out data isn't altered directly.
                break;
            default:
                console.log ("ERROR in showForm(); something went wrong!", action);
                return;
            }
            
            self.showForm = true;
        }
         
        self.handleUpdateUserForm = function() {
            console.log('Updating User: ', self.currentUser);
            
            //TODO: replace button with spinner
            
            $http.post(
                'api/Steve/update.php',
                self.currentUser
            )
            .then(
                function successCallback(response) {
                    // Refresh the updated user, ...
                    // This isn't actually refreshing data from the server, (self.showUserDetails() uses the local version)
                    // but if the update worked, then the data *should* be the same.
                    self.showUserDetails(self.currentUser.id); 
                },
                function errorCallback(err) {
                    console.log("ERROR: Enddpoint 'Steve/update.php' returned an error: " + err.data);
                }
            );
        }
        
        self.handleCreateUserForm = function() {
            console.log('New User: ', self.newUser);

            //TODO: replace button with spinner

            $http.post(
                'api/Steve/create.php',
                self.newUser
            )
            .then(
                function successCallback(response) {
                    // As a design choice, we could refresh all data from the server, or
                    // simply make sure the API returns a full record (including the newly
                    // created id). The latter choice results in a faster app, with less data being
                    // sent back and forth, so let's do that.
                        
                    // response.data should hold a complete user record, so append it to the master list
                    // and select it in the UI
                    self.list.append(response.data);
                    self.showUserDetails(response.data.id);
                    
                    // Reset the newUser bound data
                    self.newUser = {
                        firstName: '',
                        lastName: '',
                        email: '',
                        description: ''
                    };
                    
                },
                function errorCallback(err) {
                    console.log("ERROR: Enddpoint 'Steve/create.php' returned an error: " + err.data);
                }
            );
        };
    });

})();