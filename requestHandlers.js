/*
   This is a coolection of handlers for different request
*/
var exec = require("child_process").exec;

function temp_dirty_work(response) {
	exec("ls -alh", { timeout: 10000, maxBuffer: 20000*1024 },
    	function (error, stdout, stderr) {
      		response.writeHead(200, {"Content-Type": "text/plain"});
      		response.write(stdout);
      		response.end();
    	});
}

function start(response) {
	console.log("Request handler 'start' was called.");
	temp_dirty_work(response);
};

function upload(response) {
	console.log("Request handler 'upload' was called.");
	temp_dirty_work(response);
};

function show(response) {
	console.log("Request handler 'show' was called.");
	temp_dirty_work(response);
};

exports.start = start;
exports.upload  = upload;
exports.show  = show;