// Backend - server.js
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/files');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();

// Enable CORS and body parser
app.use(cors());
app.use(express.json());  // Parse incoming JSON requests

app.use('/api/auth', authRoutes);
app.use('/api/files', fileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
