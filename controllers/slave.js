var app = angular.module('app', []);
app.controller('SlaveCtrl', function AppCtrl($scope, $http) {
    //------------------------ VARIÁVEIS INICIAIS ----------------------------//
    var vm = this;
    vm.socket = io();
    vm.url = 'http://192.168.0.11:3000';
    vm.getSlaveDevice = function() {
        $http({
            method: 'GET',
            url: vm.url + '/users/' + vm.session.user.id + '/slave_devices/1',
            headers: {
                'Auth-Code': vm.session.token
            }
        }).then(function successCallback(response) {
                vm.slave = angular.copy(response.data);
                vm.slaveModal = angular.copy(response.data);

            },
            function errorCallback(response) {
                vm.dropSession();
            });
    };
    vm.resetModalSlaveChanges = function() {
        vm.slaveModal = angular.copy(vm.slave);
    };
    vm.saveModalSlaveChanges = function() {
        $http({
            method: 'PATCH',
            url: vm.url + '/users/' + vm.session.user.id + '/slave_devices/1',
            params: vm.slaveModal,
            headers: {
                'Auth-Code': vm.session.token
            }
        }).then(function successCallback(response) {
                vm.slave = angular.copy(response.data);
                alert('Slave configurations have been updated\nPlease reset Modbus Master Service to reload configurations.');
            },
            function errorCallback(response) {
                if (response.status == 401 || response.status == 403) {
                    vm.dropSession();
                } else if (response.status == 422) {
                    alert(JSON.stringify(response.data));
                }
            });

    };
    vm.dropSession = function() {
        localStorage.removeItem("user");
        sessionStorage.removeItem("user");
        location.assign('index.html');
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

    vm.saveModalNewCoil = function(){
        if(!vm.newCoil.read){
            vm.newCoil.read = false;
        }
        if(!vm.newCoil.write){
            vm.newCoil.write = false;
        }
        $http({
            method: 'POST',
            url: vm.url + '/users/' + vm.session.user.id + '/slave_devices/1/coils',
            params: vm.newCoil,
            headers: {
                'Auth-Code': vm.session.token
            }
        }).then(function successCallback(response) {
                vm.coils.push(response.data);
                alert('New coil has been created.\nPlease reset Modbus Master Service to reload configurations.');
            },
            function errorCallback(response) {
                if (response.status == 401 || response.status == 403) {
                    vm.dropSession();
                } else if (response.status == 422) {
                    alert(JSON.stringify(response.data));
                }
            });
    };

    vm.resetModalNewCoil = function(){
        vm.newCoil = null;
    };

    vm.saveModalNewHR = function(){
        if(!vm.newHoldingRegister.read){
            vm.newHoldingRegister.read = false;
        }
        if(!vm.newHoldingRegister.write){
            vm.newHoldingRegister.write = false;
        }
        $http({
            method: 'POST',
            url: vm.url + '/users/' + vm.session.user.id + '/slave_devices/1/holding_registers',
            params: vm.newHoldingRegister,
            headers: {
                'Auth-Code': vm.session.token
            }
        }).then(function successCallback(response) {
                vm.hr.push(response.data);
                alert('New holding register has been created.\nPlease reset Modbus Master Service to reload configurations.');
            },
            function errorCallback(response) {
                if (response.status == 401 || response.status == 403) {
                    vm.dropSession();
                } else if (response.status == 422) {
                    alert(JSON.stringify(response.data));
                }
            });
    };

    vm.resetModalNewHR = function(){
        vm.newHoldingRegister = null;
    };

    vm.getCoils = function() {
        $http({
            method: 'GET',
            url: vm.url + '/users/' + vm.session.user.id + '/slave_devices/1/coils',
            headers: {
                'Auth-Code': vm.session.token
            }
        }).then(function successCallback(response) {
                vm.coils = response.data;
            },
            function errorCallback(response) {
                vm.dropSession();
            });
    };

    vm.getHR = function() {
        $http({
            method: 'GET',
            url: vm.url + '/users/' + vm.session.user.id + '/slave_devices/1/holding_registers',
            headers: {
                'Auth-Code': vm.session.token
            }
        }).then(function successCallback(response) {
                vm.hr = response.data;
            },
            function errorCallback(response) {
                vm.dropSession();
            });
    };


    vm.isAuthenticated();
    if (!vm.session) {
        location.assign('index.html');
    }
    vm.getSlaveDevice();
    vm.getCoils();
    vm.getHR();



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
