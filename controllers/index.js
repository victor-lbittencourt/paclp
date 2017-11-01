var app = angular.module('app', []);
app.controller('AppCtrl', function AppCtrl($scope, $http, $location, $window) {
    //------------------------ VARIÁVEIS INICIAIS ----------------------------//
    var vm = this;
    vm.url = 'http://192.168.0.11:3000';
    vm.socket = io();
    vm.isAuthenticated = function() {
        if (localStorage.getItem("user")) {
            vm.session = localStorage.getItem("user");
        } else if (sessionStorage.getItem("user")) {
            vm.session = sessionStorage.getItem("user");
        } else {
            vm.session = null;
        }
    };

    //------------------------- LOGIN EVENTS ---------------------------------//
    //Asks server if user exists
    vm.isAuthenticated();
    if (vm.session != null) {
         location.assign("slave.html");
    }
vm.test = 'test';
    vm.userAuthentication = function() {
        $http({
            method: 'POST',
            url: vm.url+'/sessions',
            params: {
                email: vm.email,
                password: vm.password
            }
        }).then(function successCallback(response) {
                if(vm.rememberMe){
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                else{
                    sessionStorage.setItem("user", JSON.stringify(response.data));
                }
                location.assign("slave.html")
            },
            function errorCallback(response) {
                if(response.status == 403 || response.status == 406){
                    alert(" Invalid email/password");
                }
            });
    };

    //------------------------- REGISTER EVENTS ------------------------------//
    //Asks server to add user to authentication list


});









/*------------------------ VARIÁVEIS AUXILIARES --------------------------
    vm.sessionId = 0;
    vm.urlToFetch = '';
    vm.login = 'nothing to show';

    //-------------------------- EVENTOS -------------------------------------//
    vm.socket.on('ServerHandshake', function(data) {
        vm.sessionId = data.id;
        vm.socket.emit('ClientHandshake', {
            id: vm.sessionId
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
