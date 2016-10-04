/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

var storage = {
  results: []
};

var requestHandler = function(request, response) {
  var statusCode;
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'text/plain';

  if (request.method === 'GET' && request.url === '/classes/messages') {
    statusCode = 200;
    response.end(JSON.stringify(storage));

  } else if (request.method === 'POST' && request.url === '/classes/messages') {

    statusCode = 201;
    var body = [];
    request.on('data', function(chunk) {

      storage.results.push(JSON.parse(chunk));

      response.end();
    });

  } else {
    statusCode = 404;
    response.writeHead(statusCode, headers);
    response.end();
  }

  response.writeHead(statusCode, headers);

};

exports.requestHandler = requestHandler;

