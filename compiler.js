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

async function sendMessage() {
    const userMessage = userInput.value.trim();
    if (userMessage === '') {
        // Do not proceed if the user input is empty
        return;
    }

    userInput.value = ''; // Clear the input field
    displayMessage(' ' + userMessage, true);

    // Make a request to OpenAI GPT-3 API
    try {
        const response = await callOpenAIAPI(userMessage);
        const chatGPTReply = response.choices && response.choices.length > 0 ? response.choices[0].text.trim() : 'Unexpected response';
        displayMessage(chatGPTReply);
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        displayMessage('An error occurred while processing your request. Please try again later.');
    }
}

async function callOpenAIAPI(userMessage) {
    const apiKey = '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'; // Replace with your actual OpenAI API key
    const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-003/completions'; // Adjust endpoint if needed

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
    };

    const data = {
        prompt: ` ${userMessage}`,
        max_tokens: 150,
    };

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
    });

    return response.json();
}

function displayMessage(message, isUserMessage = false) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.classList.add('message', isUserMessage ? 'user-message' : 'chatgpt-message');
    chatHistory.appendChild(messageElement);
    chatHistory.scrollTop = chatHistory.scrollHeight; // Auto-scroll to bottom
}
