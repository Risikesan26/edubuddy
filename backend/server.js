// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Fixed CORS configuration
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'http://localhost:3001',
    'https://edubuddy-wheat.vercel.app'  // Removed trailing slash
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'EduBuddy backend is running!' });
});

app.post('/ask', async (req, res) => {
  const userInput = req.body.prompt;
  
  if (!userInput) {
    return res.status(400).json({ error: 'No prompt provided' });
  }
  
  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama3-8b-8192',
        messages: [
          {
            role: 'system',
            content: 'You are EduBuddy, a friendly AI tutor for school students. Always explain clearly and simply. Format your responses in markdown when helpful.',
          },
          { role: 'user', content: userInput },
        ],
        max_tokens: 1000,
        temperature: 0.7
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const reply = response.data.choices?.[0]?.message?.content;
    res.json({ reply: reply || 'Sorry, I could not generate a response.' });
  } catch (error) {
    console.error('Groq API Error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: '❌ Failed to fetch from Groq API',
      details: error.response?.data?.error?.message || error.message
    });
  }
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`✅ EduBuddy backend is running at http://localhost:${PORT}`);
});
