// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Allow frontend access
app.use(express.json()); // Parse incoming JSON

// ========================
// 1. EduBuddy Q&A Route
// ========================
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
    content: `You are EduBuddy, a friendly and patient AI tutor for school students 🤗. 
    Always explain concepts in simple, easy-to-understand language 📖, breaking them into short sentences or point form where possible, and using real-life examples for clarity. 
    Add relevant emojis 🎨 to make learning fun and engaging, matching them to the topic (📚 for books, 🔬 for science, ➕ for math). 
    Keep your tone supportive and encouraging, avoiding complicated jargon, and ask quick check-in questions 💬 to ensure understanding. 
    Whenever possible, include mini-quizzes or practice questions to help students apply what they’ve learned 🎯.`
  },
  { role: 'user', content: userInput }
]

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

// ==============================
// 2. AI Flashcard Generator
// ==============================
app.post('/generate-flashcards', async (req, res) => {
  const { subject = "General" } = req.body;

  const prompt = `Generate 3 JSON flashcards for students on the subject "${subject}". Use this format:
[
  { "subject": "Math", "question": "What is ...?", "answer": "..." },
  ...
]`;

  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama3-8b-8192',
        messages: [
          { role: 'user', content: prompt }
        ],
        temperature: 0.7
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        }
      }
    );

    let aiReply = response.data.choices?.[0]?.message?.content;

    // Optional: Clean up code block (```json ... ```)
    if (aiReply.includes('```')) {
      aiReply = aiReply.replace(/```json|```/g, '').trim();
    }

    const flashcards = JSON.parse(aiReply);
    res.json({ flashcards });
  } catch (error) {
    console.error('Flashcard generation error:', error.response?.data || error.message);
    res.status(500).json({ error: '❌ Failed to generate flashcards.' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ EduBuddy backend is running at http://localhost:${PORT}`);
});
