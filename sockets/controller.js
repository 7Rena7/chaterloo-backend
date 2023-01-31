require("colors");

const socketController = (socket) => {
  console.log("Client Connected: ".green, socket.id);

  socket.on("disconnect", () => {
    console.log("Client Disconnected: ".red, socket.id);
  });

  socket.on("send-message", (payload, callback) => {
    // socket.emit("send-message", "Message sent");

    const id = 123456;
    callback({ id, dateSend: new Date().getTime() });

    socket.broadcast.emit("send-message", payload);
  });
};

module.exports = { socketController };
