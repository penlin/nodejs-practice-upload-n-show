/*
   This is a coolection of handlers for different request
*/

function start() {
	console.log("Request handler 'start' was called.");
	return "Hello start!";
};

function upload() {
	console.log("Request handler 'upload' was called.");
	return "Hello upload!";
};

function show() {
	console.log("Request handler 'show' was called.");
	return "Hello show!";
};

exports.start = start;
exports.upload  = upload;
exports.show  = show;