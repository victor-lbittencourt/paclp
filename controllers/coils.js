var app = angular.module('app', []);
app.controller('CoilsCtrl', function AppCtrl($scope, $http) {
    //------------------------ VARIÁVEIS INICIAIS ----------------------------//
    var vm = this;
    vm.socket = io();
    vm.url = 'http://192.168.0.11:3000';

    vm.isAuthenticated = function() {
        if (localStorage.getItem("user")) {
            vm.session = JSON.parse(localStorage.getItem("user"));
            vm.verifyAuthentication();
        } else if (sessionStorage.getItem("user")) {
            vm.session = JSON.parse(sessionStorage.getItem("user"));
            vm.verifyAuthentication();
        } else {
            vm.session = null;
        }
    };
    vm.verifyAuthentication = function() {
        $http({
            method: 'GET',
            url: vm.url + '/users/' + vm.session.user.id,
            headers: {
                'Auth-Code': vm.session.token
            }
        }).then(function successCallback(response) {},
            function errorCallback(response) {
                vm.dropSession();
            });
    };
    vm.dropSession = function() {
        localStorage.removeItem("user");
        sessionStorage.removeItem("user");
        location.assign('index.html');
    };

    vm.isAuthenticated();
    if (!vm.session) {
        location.assign('index.html');
    }

    vm.socket.on('ServerHandshake', function() {
        vm.socket.emit('ClientHandshake', {
            id: vm.session.user.id,
            token: vm.session.token,
            type: 'Coils'
        });
    });
    vm.socket.on('Coils', function(coilsData) {
        console.log(coilsData);
        $scope.$apply(function() {
            vm.coils = coilsData.coils;
        });
    });

    vm.getWritableCoils = function() {
        $http({
            method: 'GET',
            url: vm.url + '/users/' + vm.session.user.id + '/slave_devices/1/coils?writeable=true',
            headers: {
                'Auth-Code': vm.session.token
            }
        }).then(function successCallback(response) {
                vm.writableCoils = response.data;
                console.log(response.data);
            },
            function errorCallback(response) {
                vm.dropSession();
            });
    };
    vm.getWritableCoils();
    vm.setCoilNewValue = function(data){
        $http({
            method: 'PATCH',
            url: vm.url + '/users/' + vm.session.user.id + '/slave_devices/1/write/coils/' + data.id,
            params: data,
            headers: {
                'Auth-Code': vm.session.token
            }
        }).then(function successCallback(response) {
            },
            function errorCallback(response) {
                if (response.status == 401 || response.status == 403) {
                    vm.dropSession();
                } else if (response.status == 422) {
                    alert(JSON.stringify(response.data));
                }
            });
    };


});
