var app = angular.module('app', []);
app.controller('AppCtrl', function AppCtrl($scope, $http, $location, $window) {
    //------------------------ VARIÁVEIS INICIAIS ----------------------------//
    var vm = this;
    vm.socket = io();
    vm.user = {
        email: '',
        password: ''
    };

    //------------------------- LOGIN EVENTS ---------------------------------//
    //Asks server if user exists
    vm.userAuthentication = function() {
        vm.socket.emit('AuthUser', {
            email: vm.user.email,
            password: vm.user.password
        });
    };
    //If user exists, redirects to slave page
    vm.socket.on('UserAuth', function() {
        location.assign("slave.html");
    });
    //If user doesn't exist, stays on login page and alerts user's inexistence
    vm.socket.on('UserUnauth', function() {
        alert('No such user.');
    });

    //------------------------- REGISTER EVENTS ------------------------------//
    //Asks server to add user to authentication list
    vm.userRegister = function() {
        //Makes sure new password is correct before adding new user
        if (vm.newPassword === vm.confirmPassword) {
            vm.user.password = vm.newPassword;
            vm.socket.emit('RegisterUser', {
                email: vm.user.email,
                password: vm.user.password
            });
        }
        else{
            alert('Password doesnt match. Please, try again');
        };
    };
    vm.socket.on('UserRegistered', function(){
        location.assign("index.html");
    });

});









/*------------------------ VARIÁVEIS AUXILIARES --------------------------
    vm.userId = 0;
    vm.urlToFetch = '';
    vm.login = 'nothing to show';

    //-------------------------- EVENTOS -------------------------------------//
    vm.socket.on('ServerHandshake', function(data) {
        vm.userId = data.id;
        vm.socket.emit('ClientHandshake', {
            id: vm.userId
        });
    });
    vm.socket.on('fetchUrl', function(data) {
        vm.urlToFetch = data.url;
        $http({
            method: 'GET',
            url: vm.urlToFetch
        }).then(function successCallback(response) {
            vm.login = response.data.login;
        }, function errorCallback(response) {
            vm.error = 'Error fetching '+data.url+'. Try again.';
        });
    });
*/
