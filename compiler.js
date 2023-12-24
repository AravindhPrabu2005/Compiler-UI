const chatHistory = document.querySelector('.chat-history');
const userInput = document.querySelector('#user-input');
const sendButton = document.querySelector('#send-button');

// Set the initial value and placeholder for the input box
userInput.value = '';
userInput.placeholder = 'Type anything after "Compile the code"';

sendButton.addEventListener('click', sendMessage);

// Add an event listener for the Enter key press
userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevents the default behavior of adding a new line
        sendMessage();
    }
});

function sendMessage() {
    const userMessage = userInput.value.trim();
    if (userMessage === '') {
        // Do not proceed if the user input is empty
        return;
    }

    userInput.value = ''; // Clear the input field
    displayMessage('Compile the code with sample inputs: ' + userMessage, true);

    setTimeout(() => {
        const sampleReply = generateSampleReply(userMessage);
        displayMessage(sampleReply);
    }, 1000);
}

function displayMessage(message, isUserMessage = false) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.classList.add('message', isUserMessage ? 'user-message' : 'chatgpt-message');
    chatHistory.appendChild(messageElement);
    chatHistory.scrollTop = chatHistory.scrollHeight; // Auto-scroll to bottom
}

function generateSampleReply(userMessage) {
    const sampleReplies = [
        "That's interesting! Tell me more.",
        "I'm not sure I understand. Can you rephrase that?",
        "I'm still learning, but I'll try my best to answer your question.",
        "Let me think about that for a moment.",
        "I'm curious to know what you think about that.",
    ];
    const randomIndex = Math.floor(Math.random() * sampleReplies.length);
    return sampleReplies[randomIndex];
}
