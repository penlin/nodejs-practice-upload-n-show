/*
 This is the main executing .js file
*/

var server = require("./server");
var route  = require("./route")
server.start(route.route);