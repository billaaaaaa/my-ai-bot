require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const chatRoutes = require('./src/routes/chat');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/chat', chatRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Chat widget available at http://localhost:${PORT}`);
});
