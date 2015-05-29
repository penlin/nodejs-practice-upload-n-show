/*
   This is a coolection of handlers for different request
*/
var fs = require("fs");
var querystring = require("querystring");
var formidable = require("./node-modules/formidable");
var utils = require("./utils");

var TEXT_TYPE_TABLE = {"js":"text/javascript","css":"text/css","html":"text/html","png":"image/png","jpg":"image/jpg","gif":"image/gif"};

function start(response, request) {
	console.log("Request handler 'start' was called.");
	function responseHTML(err, data) {
		if (err) {
			response.writeHead(500);
			response.end('404 Not Found');
		}
		response.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"});
		response.write(data);
		response.end();
	}

	fs.readFile("./index.html", responseHTML);
};

function packages(response, pathname) {
	console.log("Request handler 'packages' was called.");
    response.setHeader("Cache-Control", "public, max-age=345600000");
	response.setHeader('Expires', new Date(Date.now() + 345600000).toUTCString());

	function responseHTML(err, data) {
		if (err) {
			response.writeHead(500);
			response.end();
		}
		var text_type = utils.getFileExtention(pathname);
		console.log("request a " + text_type + " file -> " + TEXT_TYPE_TABLE[text_type]);
		if (typeof(TEXT_TYPE_TABLE[text_type]) === 'string') {
			response.writeHead(200,{"Content-Type":TEXT_TYPE_TABLE[text_type]});	
		} else {
			response.writeHead(200,{"Content-Type":"text/plain"});	
		}
		
		response.write(data);
		response.end();
	};

	fs.readFile('.' + pathname, responseHTML);
}

function images(response, pathname) {
	console.log("Request handler 'packages' was called.");
    response.setHeader("Cache-Control", "public, max-age=345600000");
	response.setHeader('Expires', new Date(Date.now() + 345600000).toUTCString());
	
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
    request.setEncoding="utf-8";
	request.addListener("data", function(chunk) {
		postData += chunk;
	});
	request.addListener("end", function() {
		response.writeHead(200, {"Content-Type":"text/html;charset=UTF-8"});
		response.write('<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.6/styles/default.min.css"><script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.6/highlight.min.js"></script><script> hljs.initHighlightingOnLoad();</script>'
			+ querystring.parse(postData).content);
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
	    //console.log("parsing done file:%s -> /img/%d.png",files.upload_file.path, timestamp);
	    //fs.renameSync(files.upload_file.path, "/img/" + timestamp + ".png");
	    response.writeHead(200, {"Content-Type": "text/plain"});
	    //response.write("received image:<br/>");
	    //response.write("<img src='/" + files.upload_file.path + "' />");
	    response.write(files.upload_file.path);
	    response.end();
  	});
};

exports.start = start;
exports.packages = packages;
exports.images = images;
exports.upload  = upload;
exports.show  = show;
