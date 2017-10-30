//-------------------------- VARIÁVEIS INICIAIS ------------------------------//
var express = require('express');
var app = express();
var http = require('http').Server(app);
var port = 8080;
var io = require('socket.io')(http);

//------------------------------ VARIÁVEIS AUXILIARES ------------------------//
var user = [{
    email: 'v',
    password: 'v',
    authenticated: false
}];


//-----------------------------------ARQUIVOS ESTÁTICOS-----------------------//
app.use(express.static('controllers'));
app.use(express.static('styles'));
app.use(express.static('views'));

//-----------------------------------SERVER CONFIG----------------------------//
http.listen(port, function(err) {
    console.log("Listening on port " + port);
});

//---------------------------------EVENTOS------------------------------------//
io.on('connection', function(socket){
    console.log('Client connected.');
    //---------------------------LOGIN EVENTS---------------------------------//
    socket.on('AuthUser', function(data){
        var auth = false;
        for (var i = 0; i < user.length; i++) {
            if(user[i].email===data.email && user[i].password===data.password){
                auth = true;
            };
        };
        if(auth){
            socket.emit('UserAuth');
            console.log('user auth');
        }
        else{
            socket.emit('UserUnauth');
            console.log('user unauth');
        };
    });

    //----------------------------REGISTER EVENTS-----------------------------//
    socket.on('RegisterUser', function(data){
        user.push(data);
        socket.emit('UserRegistered');
    });

    //-----------------------------IS USER AUTHENTICATED? EVENTS--------------//
    socket.emit('ServerHandshake');
    socket.on('stored', function(data){
        console.log('STORED: '+data);
    });

});
