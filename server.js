// requiring socket.io
const io = require('socket.io')(3000);

// Storing all the users to my chat app
const users = [];

// activating my socket
io.on("connection", socket => {

    socket.on("new-user", name =>{
        users[socket.id] = name;
        socket.broadcast.emit("user-connected", name);
    })
    // Receiving our message from the chat app here
    socket.on("send-chat-message", message => {
        // This will send the typed chat message from the user who typed it, to other users connected to the server 
        socket.broadcast.emit("chat-message", {message: message, name: users[socket.id]});
    });

    // This handles the disconnected users
    socket.on("disconnect", () => {
        socket.broadcast.emit("user-disconnected", users[socket.id]);
        delete users[socket.id];
    });
});  