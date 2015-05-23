/*
   This is a coolection of handlers for different request
*/
var querystring = require("querystring");
var exec = require("child_process").exec;

function temp_dirty_work(response, postData) {
	exec("ls -alh", { timeout: 10000, maxBuffer: 20000*1024 },
    	function (error, stdout, stderr) {
      		response.writeHead(200, {"Content-Type": "text/plain"});
      		response.write(stdout);
      		response.end();
    	});
}

function start(response) {
	console.log("Request handler 'start' was called.");
//	temp_dirty_work(response);
	var body = '<html>' + 
		'<head>' + 
		'<meta http-equiv="Content-Type" content="text/html"' + 
		'charset=UTF-8 />' + 
		'</head>' +
		'<body>' +
		'<form action="/upload" method="post">' + 
		'<textarea name="text" rows="20" cols="60"></textarea>' +
		'<input type="submit" value="Submit text" />' +
		'</form>' +
		'</body>' +
		'</html>';

	response.writeHead(200, {"Content-Type":"text/html"});
	response.write(body);
	response.end();
};

function upload(response, postData) {
	console.log("Request handler 'upload' was called.");
//	temp_dirty_work(response);
	response.writeHead(200, {"Content-Type":"text/plain"});
	response.write(querystring.parse(postData).text);
	response.end();
};

function show(response, postData) {
	console.log("Request handler 'show' was called.");
	temp_dirty_work(response);
};

exports.start = start;
exports.upload  = upload;
exports.show  = show;
