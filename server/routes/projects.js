const express = require('express');
const router = express.Router();

// GET /api/projects - Get all projects
router.get('/', (req, res) => {
  res.json({ message: 'Projects API endpoint' });
});

// GET /api/projects/:id - Get specific project
router.get('/:id', (req, res) => {
  res.json({ message: `Project ${req.params.id} details` });
});

module.exports = router;
