const online = document.getElementById("online");
const offline = document.getElementById("offline");
const form = document.getElementById("formId");
const msg = document.getElementById("msg").value;
const btnSend = document.getElementById("btnSend");

const socket = io("http://localhost:8081");

socket.on("connect", () => {
  offline.style.display = "none";
  online.style.display = "";
});

socket.on("disconnect", () => {
  offline.style.display = "";
  online.style.display = "none";
});

function submitForm(event) {
  event.preventDefault();
  const message = {
    msg: msg,
    client: "123456789abcde",
    date: new Date().getTime(),
  };

  socket.emit("send-message", message, ({ id, dateSend }) => {
    console.log("From server: ", { id, dateSend });
  });
  document.getElementById("msg").value = "";
}

form.addEventListener("submit", submitForm);

// receive a message from the server
socket.on("send-message", (...args) => {
  console.log("Message received: ", args);
});
