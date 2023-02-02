require("dotenv").config();
const RESTServer = require("./models/server");
const SocketsServer = require("./models/server-sockets");

// const RESTserver = new RESTServer();

const SocketServer = new SocketsServer();

// RESTserver.listen();
SocketServer.listen();
