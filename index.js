// index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const { startServer } = require('./server/app');

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/placementpro';

async function main() {
  await mongoose.connect(MONGO_URI);
  console.log('✅ MongoDB connected successfully');
  const app = await startServer();
  // Serve static frontend
  app.use(express.static(path.join(__dirname)));
  app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
}

main().catch((err) => {
  console.error('❌ Server startup error:', err);
  process.exit(1);
});
