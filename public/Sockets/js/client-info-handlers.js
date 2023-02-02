const btnUserName = document.getElementById("btnUserName");

btnUserName.onclick(() => {
  console.log(btnUserName);
});

function submitUserName(event) {
  event.preventDefault();
}
