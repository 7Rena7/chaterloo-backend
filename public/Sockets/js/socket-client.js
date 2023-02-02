const online = document.getElementById("online");
const offline = document.getElementById("offline");

const userName = document.getElementById("user name");
const btnMessage = document.getElementById("btnMessage");

let socket = io("localhost:8080/");

if (window.location.href) {
  socket = io(window.location.href);
}

socket.on("connect", () => {
  offline.style.display = "none";
  online.style.display = "";
});

socket.on("disconnect", () => {
  offline.style.display = "";
  online.style.display = "none";
});

const btnUserName = document.getElementById("btnUserName");

btnUserName.addEventListener("click", () => {
  if (userName.value.trim() === "") {
    return window.alert("Enter a valid user name please.");
  }

  userName.setAttribute("readonly", "true");
  userName.style.backgroundColor = "#D3D3D3";

  const nameHelper = document.getElementById("nameHelpId");
  nameHelper.innerText = "Name entered, thanks!";

  btnUserName.style.display = "none";

  const messageForm = document.getElementById("messageForm");
  messageForm.style.display = "";
  btnMessage.style.display = "";
});

function submitMessage() {
  const msg = document.getElementById("msg");

  if (msg.value.trim() === "") {
    return window.alert("Enter a valid message.");
  }

  const clientId = socket.id;
  const dateToday = new Date().getTime();

  const message = {
    msg: msg.value.trim(),
    clientName: userName.value.trim(),
    clientId,
    dateSend: dateToday,
  };

  socket.emit("send-message", message, ({ id }) => {
    console.log("Message Send", { id, dateToday });
  });

  const confirm = document.getElementById("confirm");
  const help = document.getElementById("helpId");

  msg.value = "";
  help.style.display = "none";
  confirm.style.display = "";

  setTimeout(() => {
    help.style.display = "";
    confirm.style.display = "none";
  }, 1000);
}

btnMessage.addEventListener("click", submitMessage);

// receive a message from the server
socket.on("send-message", ({ msg, clientName, dateSend }) => {
  const newMessage = `
    <h4 class="card-title" style="display: inline">${clientName}</h4>
    <p class="card-text" style="display: inline; margin-bottom: 0.5rem">
      ${dateSend}
    </p>
    <p class="card-text">
      ${msg}
    </p>
  `;

  const messagesContainer = document.getElementById("messages-box");
  messagesContainer.innerHTML += newMessage;
});
