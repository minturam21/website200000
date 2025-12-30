const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

const healthRoutes = require('./routes/health');
const enquiryRoutes = require('./routes/enquiry');

dotenv.config();

const app = express();

/* -------------------- SECURITY & MIDDLEWARE -------------------- */

// Security headers
app.use(helmet());

// CORS (simple & safe for now)
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? process.env.FRONTEND_URL
    : '*',
  methods: ['GET', 'POST'],
}));

// Body parsers
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

/* -------------------- ROUTES -------------------- */

// Health check
app.use('/api/health', healthRoutes);

// Public enquiry
app.use('/api/enquiry', enquiryRoutes);

/* -------------------- FALLBACKS -------------------- */

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'API endpoint not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
