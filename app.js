//-------------------------- VARIÁVEIS INICIAIS ------------------------------//
var express = require('express');
var app = express();
var http = require('http').Server(app);
var port = 8080;
var io = require('socket.io')(http);
var request = require('request');
var url = 'http://192.168.0.11:3000';


//-----------------------------------ARQUIVOS ESTÁTICOS-----------------------//
app.use(express.static('controllers'));
app.use(express.static('styles'));
app.use(express.static('views'));
app.use(express.static('node_modules'));
//-----------------------------------SERVER CONFIG----------------------------//
http.listen(port, function(err) {
    console.log("Listening on port " + port);
});

//---------------------------------EVENTOS------------------------------------//
io.on('connection', function(socket) {
    console.log('Client connected.');
    socket.emit('ServerHandshake');
    socket.on('ClientHandshake', function(data) {
        if (data.type == 'Coils') {
            setInterval(function(data, socket) {
                    request({
                        url: url + '/users/' + data.id + '/slave_devices/1/read/coils',
                        headers: {
                            'Auth-Code': data.token
                        }
                    }, function(error, response, body) {
                        var coils = JSON.parse(body);
                        socket.emit('Coils', {
                            coils: coils
                        });
                    })
                },
                200, data, socket);
        } else if (data.type == 'HR') {
            setInterval(function(data, socket) {
                    request({
                        url: url + '/users/' + data.id + '/slave_devices/1/read/holding_registers',
                        headers: {
                            'Auth-Code': data.token
                        }
                    }, function(error, response, body) {
                        var hr = JSON.parse(body);
                        socket.emit('HoldingRegisters', {
                            hr: hr
                        });
                    })
                },
                200, data, socket);
        }
    });
});
