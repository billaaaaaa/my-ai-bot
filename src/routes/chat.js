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

        // Fetch active bot settings (Keep for theme/other settings, but identity is hardcoded)
        let settings = await BotSettings.findOne({ isActive: true });

        // Hardcoded identity for EcomNexus Academy
        const botName = settings?.botName || 'EcomNexus Academy';
        const welcomeMessage = settings?.welcomeMessage || 'Assalam-o-Alaikum! Welcome to EcomNexus Academy. Main Asif ka AI assistant hoon. Main aapko Amazon PPC, WordPress, aur Shopify seekhne mein madad kar sakta hoon. Aap kya seekhna chahte hain?';

        const response = await aiController.generateResponse(message, null, history);
        res.json({
            reply: response,
            botName: botName
        });
    } catch (error) {
        console.error('Error in chat route:', error);
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
});

module.exports = router;
