/*
  This is a simple utility route program to handle different request
*/

function isFile(pathname) {
	return ((pathname.indexOf('/include') === 0) || 
			(pathname.indexOf('.html', pathname.length - 5) !== -1));
}

function route(handle, pathname, response, postData) {
	console.log("About to route a request for " + pathname);
	if (typeof handle[pathname] === 'function') {
		handle[pathname](response, postData);
	} else if ( isFile(pathname)) {
		handle["/include"](response, pathname);
	} else {
		console.log("No request handler found for " + pathname);
		
  		response.writeHead(200, {"Content-Type": "text/plain"});
  		response.write("404 Not found");
  		response.end();
	}
};

exports.route = route;
