// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// More permissive CORS configuration for debugging
app.use(cors({
  origin: true,  // Allow all origins for now
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  optionsSuccessStatus: 200
}));

// Additional CORS headers as middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

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
