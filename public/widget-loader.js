(function () {
    console.log("Widget Loading...");
    // Configuration
    const baseUrl = 'https://my-ai-bot-yoje.onrender.com';

    // Inject Stylesheet
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${baseUrl}/style.css`;
    document.head.appendChild(link);

    // Create Widget Container
    const container = document.createElement('div');
    container.id = 'chat-widget-container';
    container.innerHTML = `
        <div id="chat-window">
            <div id="chat-header">
                <span>khareedaree Support</span>
                <button id="close-chat" style="background:none; border:none; color:white; cursor:pointer; font-size:20px;">&times;</button>
            </div>
            <div id="chat-messages">
                <div class="message ai-message">Assalam-o-Alaikum! Main khareedaree.com ka AI assistant hoon. Main aapki kya madad kar sakta hoon?</div>
            </div>
            <div id="chat-input-container">
                <div class="input-row">
                    <input type="text" id="chat-input" placeholder="Yahan likhein...">
                    <button id="send-button">Send</button>
                </div>
                <div id="typing" class="typing-indicator">AI soch raha hai...</div>
            </div>
        </div>
        
        <button id="chat-button">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a.75.75 0 0 1-1.154-.633 4.5 4.5 0 0 0 1.545-3.328A8.395 8.395 0 0 1 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
            </svg>
        </button>
    `;
    document.body.appendChild(container);

    // Load Main Script
    const script = document.createElement('script');
    script.src = `${baseUrl}/script.js`;
    document.body.appendChild(script);
})();
