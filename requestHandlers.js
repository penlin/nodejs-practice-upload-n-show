/*
   This is a coolection of handlers for different request
*/
var fs = require("fs");
var querystring = require("querystring");

function start(response) {
	console.log("Request handler 'start' was called.");
	function responseHTML(err, data) {
		if (err) {
			response.writeHead(500);
			response.end('404 Not Found');
		}
		response.writeHead(200,{"Content-Type":"text/html"});
		response.write(data);
		response.end();
	}

	fs.readFile("./index.html", responseHTML);
};

function packages(response, pathname) {
	console.log("Request handler 'packages' was called.");
	
	function responseHTML(err, data) {
		if (err) {
			response.writeHead(500);
			response.end();
		}
		response.writeHead(200);
		response.write(data);
		response.end();
	}

	fs.readFile('.' + pathname, responseHTML);
}

function upload(response, postData) {
	console.log("Request handler 'upload' was called.");
	response.writeHead(200, {"Content-Type":"text/plain"});
	response.write(querystring.parse(postData).content);
	response.end();
};

function show(response, postData) {
	console.log("Request handler 'show' was called.");
	// TODO:
	response.writeHead(200, {"Content-Type":"text/plain"});
	response.end();
};

exports.start = start;
exports.packages = packages;
exports.upload  = upload;
exports.show  = show;
