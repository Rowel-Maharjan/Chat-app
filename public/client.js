const socket = io();

let name;
const container = document.querySelector(".container");
const messageInp = document.getElementById("messageInp");
const sendMessage = document.getElementById("sendMessage");

const append = (message, position)=>{
    const div = document.createElement("div")
    div.innerHTML = message;
    div.classList.add("message");
    div.classList.add(position);
    container.append(div)
}

do {
    name = prompt("Enter name to join");
} while (!name);

socket.emit("new-user-joined", name)

socket.on("user-joined", name=>{
    append(`${name} joined the chat`, "right");
})