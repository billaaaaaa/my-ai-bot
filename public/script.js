(function () {
    const API_BASE_URL = 'https://my-ai-bot-yoje.onrender.com';

    const chatButton = document.getElementById('chat-button');
    const chatWindow = document.getElementById('chat-window');
    const closeChat = document.getElementById('close-chat');
    const sendButton = document.getElementById('send-button');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const typingIndicator = document.getElementById('typing');

    if (!chatButton || !chatWindow) return;

    // Toggle chat window
    chatButton.addEventListener('click', () => {
        chatWindow.style.display = chatWindow.style.display === 'flex' ? 'none' : 'flex';
        if (chatWindow.style.display === 'flex') {
            chatInput.focus();
        }
    });

    closeChat.addEventListener('click', () => {
        chatWindow.style.display = 'none';
    });

    let chatHistory = [];

    // Function to add a message to the UI
    function addMessage(text, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user-message' : 'ai-message');
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Update local chat history
        chatHistory.push({
            role: isUser ? 'user' : 'model',
            content: text
        });
    }

    // Send message function
    async function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;

        addMessage(message, true);
        chatInput.value = '';
        typingIndicator.style.display = 'block';

        try {
            const response = await fetch(`${API_BASE_URL}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message,
                    history: chatHistory.slice(0, -1) // Send all but the last user message just added
                })
            });

            const data = await response.json();
            typingIndicator.style.display = 'none';

            if (data.reply) {
                addMessage(data.reply, false);
            } else {
                addMessage("Maazrat, kuch ghalti hui. Dobara koshish karein.", false);
            }
        } catch (error) {
            typingIndicator.style.display = 'none';
            console.error('Error:', error);
            addMessage("Maazrat, server se connection mein masla hai.", false);
        }
    }

    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
})();
