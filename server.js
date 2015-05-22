/*
This is a test node.js module that would start a simple echo server which only response "Hello Node!" 
*/

var http = require("http");
var PORT = 8888;

function start(){
	function onRequest (request, response) {
		console.log("Request from " + request.connection.remoteAddress);
	    response.writeHead(200, {"Content-Type": "text/plain"});       
	    response.write("Hello Node!");
	    response.end();
	};

	http.createServer(onRequest).listen(PORT);

	console.log("Server starts @ port:"+PORT);
};

exports.start=start;