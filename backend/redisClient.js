const { createClient } = require('redis');
require('dotenv').config();

const client = createClient({
    username: process.env.REDIS_USER || 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT)
    }
});

client.on('error', err => console.error('❌ Redis Client Error:', err));

const connectRedis = async () => {
    try {
        await client.connect();
        console.log('✅ Connected to Redis Labs');
    } catch (err) {
        console.error('❌ Redis Connection Failed:', err);
    }
};

module.exports = { client, connectRedis };
