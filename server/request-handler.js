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
  // var storage = {};
  var statusCode;


  if (request.method === 'GET') {
    
    statusCode = 200;
    // if (request.path !== '/classes/messages') { statusCode = 404; }
    // storage.results = [];
    response.end(JSON.stringify(storage));

  } else if (request.method === 'POST') {

    statusCode = 201;
    var body = [];
    request.on('data', function(chunk) {

      storage.results.push(JSON.parse(chunk));

      response.end();
    });

  } else if (request.url !== '/classes/messages') {
    statusCode = 404;
  }

  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  var headers = defaultCorsHeaders;

  headers['Content-Type'] = 'text/plain';

  response.writeHead(statusCode, headers);

};

exports.requestHandler = requestHandler;

