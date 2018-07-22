'use strict';

let http = require('http');

let server = http.createServer(function (request, response) {
	console.log(`New a ${request.method} request to ${request.url}!`);
	response.write('Here is your response');
	response.end();
});

server.listen(3000);

console.log(`Server is running on port 3000 ...`);