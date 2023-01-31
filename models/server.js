const express = require("express");
const cors = require("cors");
// const fileUpload = require("express-fileupload");

const { dbConnection } = require("../database/config");

class RESTserver {
  constructor() {
    this.app = express();
    this.port = process.env.RESTPORT;
    this.paths = {
      chats: "/api/chats",
    };

    // Connect to DB
    this.connectDB();

    // Middlewares
    this.middlewares();

    // App Routes
    this.routes();
  }

  async connectDB() {
    // Here we could switch between environments to only connect to the necessary DB
    await dbConnection();
  }

  middlewares() {
    // Public directory
    this.app.use(express.static("public/REST"));

    // CORS
    this.app.use(cors());

    // Read and Parse of request body
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.paths.chats, require("../routes/chats"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Chaterloo REST listening on port ${this.port}`);
    });
  }
}

module.exports = RESTserver;
