const socket = io();

let name;
const container = document.querySelector(".container");
const messageInp = document.getElementById("messageInp");
const sendMessage = document.getElementById("sendMessage");

const append = (names, messages, position) => {
    const message = document.createElement("div")
    const name = document.createElement("div")
    name.innerHTML = names;
    message.innerHTML = messages;
    name.classList.add("name")

    if(position == "left"){
        const left = document.createElement("div")
        container.append(left)
        left.classList.add("left");
        message.classList.add("message-left")
        left.append(name);
        left.append(message)
    }

    else if(position == "right"){
        const right = document.createElement("div")
        container.append(right)
        right.classList.add("right")
        message.classList.add("message-right")
        right.append(message)
    }
}

const appendJoinLeft = (message,position)=>{
    const div = document.createElement("div")
    div.innerHTML = message;
    div.classList.add("middle")
    container.append(div)

}

do {
    name = prompt("Enter name to join");
} while (!name);

socket.emit("new-user-joined", name)

socket.on("user-joined", name => {
    appendJoinLeft(`${name} joined the chat`, "middle");
})

sendMessage.addEventListener("submit",(e)=>{
    e.preventDefault(); //Wont reload the page;
    const message = messageInp.value;
    append("", message, "right")
    socket.emit("send", message);
    messageInp.value = "";
})

socket.on("receive", data => {
    append(data.name, data.message, "left")
})

socket.on("left", name=> {
    appendJoinLeft(`${name} left the chat`, "middle");
})
