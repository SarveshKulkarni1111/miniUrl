const express = require('express');
const router = express.Router();
const Auth = require('../middlewares/Auth');
const { getDashboardAnalytics } = require('../Controllers/Analytics');
 

router.get('/dashboard', Auth, getDashboardAnalytics);

module.exports = router;
