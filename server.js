/*
This is a test node.js server program that would only response "Hello Node!" 
*/

var http = require("http");
var PORT = 8888;

function onRequest (request, response) {
	console.log("Request from " + request.connection.remoteAddress);
    response.writeHead(200, {"Content-Type": "text/plain"});       
    response.write("Hello Node!");
    response.end();
};

http.createServer(onRequest).listen(PORT);

console.log("Server starts @ port:"+PORT);