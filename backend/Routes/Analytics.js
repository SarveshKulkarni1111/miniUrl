const express = require('express');
const router = express.Router();
const Auth = require('../Middlewares/Auth');
const { getDashboardAnalytics } = require('../Controllers/Analytics');
 

router.get('/dashboard', Auth, rateLimit, getDashboardAnalytics);

module.exports = router;
