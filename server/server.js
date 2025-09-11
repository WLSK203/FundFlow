const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Import routes
const organizationRoutes = require('./routes/organizations');
const projectRoutes = require('./routes/projects');
const trustScoreRoutes = require('./routes/trustScores');
const transactionRoutes = require('./routes/transactions');
const auditRoutes = require('./routes/audits');
const schemeRoutes = require('./routes/schemes');

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api', limiter);

// Logging
app.use(morgan('combined'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// API routes
app.use('/api/organizations', organizationRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/trust-scores', trustScoreRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/audits', auditRoutes);
app.use('/api/schemes', schemeRoutes);

// Dashboard stats endpoint
app.get('/api/dashboard/stats', (req, res) => {
  // Mock data for now - would integrate with database and AI services
  res.json({
    totalOrganizations: 2840,
    totalProjects: 12450,
    totalFundsTracked: 85600000000,
    averageTrustScore: 76,
    activeAudits: 1200,
    resolvedIssues: 8900
  });
});

// Global search endpoint
app.get('/api/search', (req, res) => {
  const { q, type, trustScoreMin, location } = req.query;
  
  // Mock search results - would implement with proper search logic
  res.json({
    query: q,
    results: [
      {
        type: 'organization',
        id: '1',
        name: 'Akshaya Patra Foundation',
        trustScore: 94,
        description: 'Largest NGO in India providing mid-day meals',
        location: 'Bangalore, Karnataka'
      }
    ],
    total: 1,
    filters: { type, trustScoreMin, location }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Route not found',
    path: req.originalUrl
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 FundFlow Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
});

module.exports = app;
