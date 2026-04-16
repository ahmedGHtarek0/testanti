const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const router = express.Router();

// @route   POST /api/ai/chat
// @desc    Get response from Gemini AI
router.post('/chat', async (req, res) => {
  try {
    const { messages, input } = req.body;

    if (!input) {
      return res.status(400).json({ message: 'Missing input query' });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Check if key exists
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ message: 'GEMINI_API_KEY is not configured on the server' });
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-flash-latest",
      systemInstruction: "You are TITAN.AI, a high-end personal machine learning fitness consultant. Provide concise, professional, futuristic sounding fitness and nutrition advice. Format your output with markdown."
    });

    // Formatting history for Gemini
    const history = (messages || [])
      .filter((m, i) => !(i === 0 && m.role === 'ai')) // Skip initial AI greeting
      .map(m => ({
        role: m.role === 'ai' ? 'model' : 'user',
        parts: [{ text: m.text }]
      }));

    const chat = model.startChat({
      history: history,
    });

    const result = await chat.sendMessage(input);
    const text = result.response.text();

    res.json({ text });
  } catch (error) {
    console.error("Gemini Backend Error:", error);
    res.status(500).json({ message: `Neural connection error: ${error.message}` });
  }
});

module.exports = router;
