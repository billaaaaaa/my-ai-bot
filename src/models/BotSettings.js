const mongoose = require('mongoose');

const BotSettingsSchema = new mongoose.Schema({
    botName: {
        type: String,
        required: true,
        default: 'khareedaree AI Assistant'
    },
    welcomeMessage: {
        type: String,
        required: true,
        default: 'Assalam-o-Alaikum! Main khareedaree.com ka AI assistant hoon. Main aapki kya madad kar sakta hoon?'
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
        default: "You are the official AI customer support agent for khareedaree.com. Your primary role is to assist customers with queries related to the store, products, delivery, and return policies. Always reply politely in Roman Urdu or Urdu."
    }
}, { timestamps: true });

module.exports = mongoose.model('BotSettings', BotSettingsSchema);
