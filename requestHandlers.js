/*
   This is a coolection of handlers for different request
*/
var fs = require("fs");
var querystring = require("querystring");
formidable = require("./node-modules/formidable");


function start(response, request) {
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
		response.writeHead(200,{"Content-Type":"text/javascript"});
		response.write(data);
		response.end();
	};

	fs.readFile('.' + pathname, responseHTML);
}

function images(response, pathname) {
	console.log("Request handler 'packages' was called.");
	
	function responseHTML(err, data) {
		if (err) {
			response.writeHead(500);
			response.end();
		}
		response.writeHead(200,{"Content-Type":"image/png"});
		response.write(data, "binary");
		response.end();
	};

	fs.readFile('.' + pathname, responseHTML);
}

function upload(response, request) {
	console.log("Request handler 'upload' was called.");
	var postData = '';
	request.addListener("data", function(chunk) {
		postData += chunk;
	});
	request.addListener("end", function() {
		response.writeHead(200, {"Content-Type":"text/html"});
		response.write('<html><body>' + querystring.parse(postData).content + '</body></html>');
		response.end();		
	});
};

function show(response, request) {
	console.log("Request handler 'show' was called.");

	var form = new formidable.IncomingForm();
	//form.encoding = 'utf-8';
	form.uploadDir = "img"
	console.log("about to parse");
	form.parse(request, function(error, fields, files) {
		var timestamp = (new Date()).getTime();
	    console.log("parsing done file:%s -> /img/%d.png",files.upload_file.path, timestamp);
	    //fs.renameSync(files.upload_file.path, "/img/" + timestamp + ".png");
	    response.writeHead(200, {"Content-Type": "text/html"});
	    response.write("received image:<br/>");
	    response.write("<img src='/" + files.upload_file.path + "' />");
	    response.end();
  	});
};

exports.start = start;
exports.packages = packages;
exports.images = images;
exports.upload  = upload;
exports.show  = show;
