const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

let academyInfoStr = "";
try {
    const rawData = fs.readFileSync(path.join(__dirname, '../knowledge/academy_info.json'), 'utf8');
    const academyInfo = JSON.parse(rawData);
    academyInfoStr = JSON.stringify(academyInfo, null, 2);
} catch (error) {
    console.error('Failed to load academy info:', error);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const ECONEXUS_SYSTEM_PROMPT = "You are EcomNexus Academy's AI. Answer exclusively about Amazon PPC, WordPress, and Shopify.\nUse this data: " + academyInfoStr;

const generateResponse = async (prompt, systemInstruction, history = []) => {
    try {
        // Context Trimming: Keep last 10 messages (5 exchanges) to save tokens
        const trimmedHistory = history.slice(-10).map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content || msg.text || "" }]
        }));

        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash",
            systemInstruction: ECONEXUS_SYSTEM_PROMPT,
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
        return response.text();
    } catch (error) {
        console.error('GENERATE_RESPONSE_ERROR:', error);
        return 'Assalam-o-Alaikum! Main EcomNexus Academy ka AI assistant hoon. Filhal system busy hai, lekin aap Amazon PPC ya WordPress ke bare mein pooch sakte hain.';
    }
};

module.exports = { generateResponse };
