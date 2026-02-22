const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

// POST /api/chat
router.post('/', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const response = await aiController.generateResponse(message);
        res.json({ reply: response });
    } catch (error) {
        console.error('Error in chat route:', error);
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
});

module.exports = router;
