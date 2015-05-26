/*
This is a test node.js module that would start a simple echo server which only response "Hello Node!" 
*/

var http = require("http");
var url  = require("url");
var PORT = 8888;


function start(route, handle){
	function onRequest (request, response) {
		var postData = "";
		var pathname = url.parse(request.url).pathname;
		console.log("Request from " + request.connection.remoteAddress + " for " + pathname);

		route(handle, pathname, response, request);
	};

	http.createServer(onRequest).listen(PORT);

	console.log("Server starts @ port:"+PORT);
};

exports.start=start;
