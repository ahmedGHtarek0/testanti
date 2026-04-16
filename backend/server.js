const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectRedis } = require('./redisClient');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const aiRoutes = require('./routes/ai');
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/ai', aiRoutes);

// Connect to Redis
connectRedis();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
