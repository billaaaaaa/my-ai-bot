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

const ECONEXUS_SYSTEM_PROMPT = "You are the official AI assistant for EcomNexus Academy in Multan. You are an expert in E-commerce, specifically Amazon PPC, WordPress, and Shopify. Your goal is to help students and clients understand these topics. You represent EcomNexus Academy and its founder, Asif. Always reply politely in Roman Urdu or English as per user preference.\n\nUse this data as your primary source for answers:\n" + academyInfoStr;

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

        const MAX_RETRIES = 3;
        for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
            try {
                const result = await chat.sendMessage(prompt);
                const response = await result.response;
                return response.text();
            } catch (error) {
                const isRateLimit = error.status === 429 || (error.message && error.message.includes('429')) || error.code === 429 || (error.statusText && error.statusText.includes('Too Many Requests'));

                if (isRateLimit && attempt < MAX_RETRIES) {
                    console.log(`429 Error (Rate Limit). Retrying attempt ${attempt} of ${MAX_RETRIES} in ${attempt * 2000}ms...`);
                    await new Promise(resolve => setTimeout(resolve, attempt * 2000));
                    continue;
                }

                if (isRateLimit) {
                    console.error('GENERATE_RESPONSE_ERROR: Max retries reached for 429 Rate Limit.');
                    return 'Bot is taking a short breath due to high traffic, please try again in 30 seconds.';
                }

                console.error('GENERATE_RESPONSE_ERROR:', error);
                return 'ERROR: ' + (error.message || 'Unknown error');
            }
        }
    } catch (error) {
        console.error('OUTER_GENERATE_RESPONSE_ERROR:', error);
        return 'ERROR: ' + (error.message || 'Unknown error');
    }
};

module.exports = { generateResponse };
