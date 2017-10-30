var app = angular.module('app', []);
app.controller('SlaveCtrl', function AppCtrl($scope, $http) {
    //------------------------ VARIÁVEIS INICIAIS ----------------------------//
    var vm = this;
    vm.socket = io();
    vm.socket.on('ServerHandshake', function(){

    });
    vm.coils = [{
            name: 'Coil 1',
            value: 20,
            addres: 'I3:Data2'
        },
        {
            name: 'Coil 2',
            value: 13,
            addres: 'I3:Data0'
        },
        {
            name: 'Coil 3',
            value: 0,
            addres: 'O1:Data4'
        }
    ];

    vm.hr = [{
            name: 'HR 1',
            value: 5.6,
            addres: 'I1:Data1'
        },
        {
            name: 'HR 2',
            value: -22.5,
            addres: 'I2:Data3'
        },
        {
            name: 'HR 3',
            value: 0.48,
            addres: 'I3:Data3'
        }
    ];


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
