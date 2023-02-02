require("colors");
const { v4: uuidv4 } = require("uuid");

const socketController = (socket) => {
  console.log("Client Connected: ".green, socket.id);

  socket.on("disconnect", () => {
    console.log("Client Disconnected: ".red, socket.id);
  });

  socket.on("send-message", (payload, callback) => {
    const id = uuidv4();
    callback({ id });

    // Send message to other users
    socket.broadcast.emit("send-message", payload);
  });
};

module.exports = { socketController };
