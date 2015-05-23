/*
 This is the main executing .js file
*/

var server = require("./server");
var route  = require("./route");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/include"] = requestHandlers.packages;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;

server.start(route.route, handle);
