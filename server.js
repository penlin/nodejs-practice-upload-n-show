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

		request.setEncoding("utf8");
		request.addListener("data", function(chunk) {
			postData += chunk;
			console.log("Received POST data chunk '" + chunk + "'.");
		});
		request.addListener("end", function() {
			route(handle, pathname, response, postData);
		});
	};

	http.createServer(onRequest).listen(PORT);

	console.log("Server starts @ port:"+PORT);
};

exports.start=start;
