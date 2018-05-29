var http = require('http');

http.createServer(function(req, res){
	// Status code in header
	res.writeHead(200);
	// Response body
	res.write("Hello, this is dog.")
	// Close the connection
	res.end();
	// Listen for connections on this port
}).listen(8080);

console.log("Listenning on port 8080...");