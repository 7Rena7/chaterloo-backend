const express = require("express");
const cors = require("cors");
// const fileUpload = require("express-fileupload");

const { dbConnection } = require("../database/config");
const { socketController } = require("../sockets/controller");

class SocketsServer {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = require("http").createServer(this.app);
    this.io = require("socket.io")(this.server);

    // Connect to DB
    // this.connectDB();

    // Middlewares
    this.middlewares();

    // App Routes
    // this.routes();

    // Sockets
    this.sockets();
  }

  // async connectDB() {
  //   // Here we could switch between environments to only connect to the necessary DB
  //   await dbConnection();
  // }

  middlewares() {
    // Public directory
    this.app.use(express.static("public/Sockets"));

    // CORS
    this.app.use(cors());

    // Read and Parse of request body
    this.app.use(express.json());
  }

  sockets() {
    this.io.on("connection", socketController);
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Chaterloo SOCKETS listening on port ${this.port}`);
    });
  }
}

module.exports = SocketsServer;
