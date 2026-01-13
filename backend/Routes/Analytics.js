const express = require('express');
const router = express.Router();
const { getDashboardAnalytics } = require('../Controllers/analytics');
 

router.get('/dashboard', getDashboardAnalytics);

module.exports = router;
