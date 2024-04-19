const exp = require('constants');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);


const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

let user = {}
io.on('connection', (socket) => {
    socket.on("new-user-joined", name=>{
        user[socket.id] = name;
        socket.broadcast.emit("user-joined", name)
    })
    socket.on("send", message=>{
        socket.broadcast.emit("receive", {message: message, name: user[socket.id]})
    })
});

app.use(express.static("public"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})


