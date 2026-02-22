require('dotenv').config();
const mongoose = require('mongoose');
const BotSettings = require('../src/models/BotSettings');

async function updateIdentity() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const newSettings = {
            botName: 'EcomNexus AI Assistant',
            welcomeMessage: 'Assalam-o-Alaikum! Welcome to EcomNexus Academy. Main Asif ka AI assistant hoon. Main aapko Amazon PPC, WordPress, aur Shopify seekhne mein madad kar sakta hoon. Aap kya seekhna chahte hain?',
            systemInstruction: "You are the official AI assistant for EcomNexus Academy in Multan. You are an expert in E-commerce, specifically Amazon PPC, WordPress, and Shopify. Your goal is to help students and clients understand these topics. You represent EcomNexus Academy and its founder, Asif. Always reply politely in Roman Urdu or English as per user preference.",
            isActive: true
        };

        const result = await BotSettings.findOneAndUpdate(
            { isActive: true },
            newSettings,
            { upsert: true, new: true }
        );

        console.log('Identity updated successfully:', result.botName);
    } catch (error) {
        console.error('Error updating identity:', error);
    } finally {
        await mongoose.connection.close();
    }
}

updateIdentity();
