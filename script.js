const socket = io('http://localhost:3000');

// Trying to target the form id on index.html
const messageForm = document.getElementById("send-container");

const messageContainer = document.getElementById("message-container");

// Targeting the input element on index.html
const messageInput = document.getElementById("message-input");

const name = prompt("What is your name??");
appendMessage("You joined");
socket.emit("new-user", name);

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`);
});

// This will tell us the user's name and when the user connects
socket.on("user-connected", name => {
    appendMessage(`${name} connected`);
});

// This will tell us the user's name and when the user disconnects
socket.on("user-disconnected", name => {
    appendMessage(`${name} disconnected`);
});

// This will prevent the submit function attached to the form
messageForm.addEventListener("submit", e => {
    e.preventDefault();

    // Getting the value of our Input and sending it to the server. Then set the input to an empty string
    const message = messageInput.value;
    appendMessage(`You: ${message}`)
    socket.emit("send-chat-message", message);
    messageInput.value = "";
});

function appendMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.innerHTML = message;
    messageContainer.append(messageElement);
}