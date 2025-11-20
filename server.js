#!/usr/bin/env node

/**
 * Module dependencies.
 */
/* create ,read, update, delete - CRUD */

var app = require('./config/app');
var debug = require('debug')('webproject:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

/**
 * Start HTTP server and automatically try next ports if the requested
 * port is already in use. This avoids repeated EADDRINUSE crashes during
 * development when another process is holding the port.
 */
let server;
function listenWithRetry(startPort, maxRetries = 10) {
  const attempt = (p, remaining) => {
    const srv = http.createServer(app);
    srv.on('listening', () => {
      server = srv;
      app.set('port', p);
      onListening();
    });
    srv.on('error', (err) => {
      if (err.syscall !== 'listen') {
        throw err;
      }
      if (err.code === 'EADDRINUSE') {
        console.error('Port ' + p + ' is already in use');
        if (remaining > 0) {
          const next = p + 1;
          console.log('Trying port ' + next + '...');
          attempt(next, remaining - 1);
        } else {
          console.error('No available ports found after retries.');
          process.exit(1);
        }
      } else {
        throw err;
      }
    });
    srv.listen(p);
  };
  attempt(startPort, maxRetries);
}

// Start listening with retries (uses normalized port number)
listenWithRetry(port, 10);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
