const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateResponse = async (prompt, systemInstruction, history = []) => {
    try {
        // Context Trimming: Keep last 10 messages (5 exchanges) to save tokens
        const trimmedHistory = history.slice(-10).map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content || msg.text || "" }]
        }));

        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash",
            systemInstruction: systemInstruction || "You are a helpful assistant.",
            safetySettings: [
                {
                    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                    threshold: HarmBlockThreshold.BLOCK_NONE,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                    threshold: HarmBlockThreshold.BLOCK_NONE,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                    threshold: HarmBlockThreshold.BLOCK_NONE,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                    threshold: HarmBlockThreshold.BLOCK_NONE,
                },
            ],
        });

        // Use startChat for history-aware generation
        const chat = model.startChat({
            history: trimmedHistory,
        });

        const result = await chat.sendMessage(prompt);
        const response = await result.response;
        const text = response.text();
        return text;
    } catch (error) {
        console.error('GENERATE_RESPONSE_ERROR:', error);

        // Handle 429 Too Many Requests specifically
        if (error.status === 429 || (error.message && error.message.includes('429')) || error.code === 429) {
            return 'Bot is taking a short breath, please try again in 30 seconds.';
        }

        return 'ERROR: ' + (error.message || 'Unknown error');
    }
};

module.exports = { generateResponse };
