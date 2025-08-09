// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Fixed route - changed from '/ask' to '/api/ask'
app.post('/ask', async (req, res) => {
  const userInput = req.body.prompt;
  
  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama3-8b-8192',
        messages: [
          {
            role: 'system',
            content: 'You are EduBuddy, a friendly AI tutor for school students. Always explain clearly and simply.',
          },
          { role: 'user', content: userInput },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const reply = response.data.choices?.[0]?.message?.content;
    res.json({ reply });
  } catch (error) {
    console.error('Groq API Error:', error.response?.data || error.message);
    res.status(500).json({ error: '❌ Failed to fetch from Groq API' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ EduBuddy backend is running at http://localhost:${PORT}`);
});