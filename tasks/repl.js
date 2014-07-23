var repl = require("repl")
 
var replServer = repl.start({prompt:'EventQueue> '})
 
replServer.context.EventQueue = require('./../')
