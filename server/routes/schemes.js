const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Welfare Schemes API endpoint' });
});

module.exports = router;
