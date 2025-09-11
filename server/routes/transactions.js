const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Transactions API endpoint' });
});

module.exports = router;
