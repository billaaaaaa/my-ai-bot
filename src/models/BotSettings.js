const mongoose = require('mongoose');

const BotSettingsSchema = new mongoose.Schema({
    botName: {
        type: String,
        required: true,
        default: 'EcomNexus Academy'
    },
    welcomeMessage: {
        type: String,
        required: true,
        default: 'Assalam-o-Alaikum! Welcome to EcomNexus Academy. Main Asif ka AI assistant hoon. Main aapko Amazon PPC, WordPress, aur Shopify seekhne mein madad kar sakta hoon. Aap kya seekhna chahte hain?'
    },
    themeColor: {
        type: String,
        required: true,
        default: '#4f46e5'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    systemInstruction: {
        type: String,
        required: true,
        default: "You are the official AI assistant for EcomNexus Academy in Multan. You are an expert in E-commerce, specifically Amazon PPC, WordPress, and Shopify. Your goal is to help students and clients understand these topics. You represent EcomNexus Academy and its founder, Asif. Always reply politely in Roman Urdu or English as per user preference."
    }
}, { timestamps: true });

module.exports = mongoose.model('BotSettings', BotSettingsSchema);
