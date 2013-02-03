var express = require('express');
var template = require('swig');
var app = express();
var io = require('socket.io').listen(8081);

io.sockets.on('connection', function (socket) {

    console.log("Socket connection made");
    
    socket.on('twist', handleTwist);
    
});




app.get('/hello', handleHello);

app.get('/', handleIndex);

app.use(express.static(__dirname + '/asset'));

var appRoot = '/var/www/nodeground/servosite/';

template.init({
  allowErrors: true,
  autoescape: true,
  cache: false,
  encoding: 'utf8',
  filters: {},
  root: appRoot + 'template/'
});


function handleTwist(data){
    console.log("Twist event received %o", data);
}

function handleIndex(req, res){
    
    var tmpl = template.compileFile('index.html.swig');
    var html = tmpl.render({ title : "SWIG" });

    res.send(html);
    
    console.log("Sent index request");
    
}



function handleHello(req, res){
    
    res.send('Hello World');
    
    
}

console.log("starting webserver");

app.listen(8080);


console.log("webserver started");