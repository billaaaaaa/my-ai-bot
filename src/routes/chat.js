const express = require('express');
const router = express.Router();
const BotSettings = require('../models/BotSettings');
const aiController = require('../controllers/aiController');

// POST /api/chat
router.post('/', async (req, res) => {
    try {
        const { message, history } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Fetch active bot settings
        let settings = await BotSettings.findOne({ isActive: true });

        // If no settings exist, create default ones (for first run)
        if (!settings) {
            settings = await BotSettings.create({
                botName: 'EcomNexus Assistant',
                welcomeMessage: 'Assalam-o-Alaikum! Main EcomNexus ka AI assistant hoon. Main aapki kya madad kar sakta hoon?',
                themeColor: '#4f46e5',
                isActive: true
            });
        }

        const response = await aiController.generateResponse(message, settings.systemInstruction, history);
        res.json({
            reply: response,
            botName: settings.botName
        });
    } catch (error) {
        console.error('Error in chat route:', error);
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
});

module.exports = router;
