const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateResponse = async (prompt) => {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash",
            systemInstruction: "You are the official AI customer support agent for khareedaree.com. Your primary role is to assist customers with queries related to the store, products, delivery, and return policies. Always reply politely in Roman Urdu or Urdu. \n\n**Knowledge Base:**\n- Store Name: khareedaree.com\n- Products: We offer a wide range of products including electronics, fashion, and gadgets. Customers can visit our website for the full catalog.\n- Delivery Policy: Standard delivery takes 3 to 5 working days across Pakistan. Delivery charges are 150 Rs.\n- Return Policy: We offer an easy 7-day return and refund policy if the product is damaged or not up to the mark.\n\n**Strict Rules:**\n1. You must strictly decline answering any questions that are NOT related to khareedaree.com, shopping, or e-commerce (e.g., coding, history, politics, recipes, or general knowledge).\n2. If a user asks an out-of-scope question, reply exactly with: \"Maazrat, main khareedaree.com ka AI Assistant hoon. Main sirf aapki shopping, orders aur store ke hawalay se madad kar sakta hoon.\"\n3. Keep your answers concise, helpful, and strictly within the provided knowledge base.",
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

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        return text;
    } catch (error) {
        console.error('FULL_DETAILED_ERROR:', error);
        return 'ERROR: ' + error.message;
    }
};

module.exports = { generateResponse };
