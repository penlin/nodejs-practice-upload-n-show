/*
  This is a simple utility route program to handle different request
*/

var utils = require('./utils');

function route(handle, pathname, response, request) {
	console.log("About to route a request for " + request);
	if (typeof handle[pathname] === 'function') {
		handle[pathname](response, request);
	} else if ( utils.isFile(pathname)) {
		handle["/include"](response, pathname);
	} else if ( pathname.indexOf('/img') === 0) {
		handle["/img"](response, pathname);
	} else {
		console.log("No request handler found for " + pathname);
		
  		response.writeHead(200, {"Content-Type": "text/plain"});
  		response.write("404 Not found");
  		response.end();
	}
};

exports.route = route;
