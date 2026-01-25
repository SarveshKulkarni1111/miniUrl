const express = require('express');
const router = express.Router();
const Auth = require('../Middlewares/Auth');
const rateLimit = require("../Middlewares/rateLimit");
const redirectRateLimit = require('../Middlewares/redirectRateLimit');
const {createMiniUrl, getMiniUrls, getMiniUrl, deleteMiniUrl, redirectMiniUrl} = require('../Controllers/miniUrl');

router.post('/miniUrl', Auth, rateLimit, createMiniUrl);
router.get('/miniUrl', Auth, rateLimit, getMiniUrls);
router.get('/r/:shortCode', redirectRateLimit, redirectMiniUrl);
router.get('/:id', Auth, rateLimit, getMiniUrl);
router.post('/:id', Auth, rateLimit, deleteMiniUrl);

// router.post('/miniUrl', createMiniUrl);
// router.get('/miniUrl', getMiniUrls);
// router.get('/r/:shortCode', redirectMiniUrl);
// router.get('/:id', getMiniUrl);
// router.post('/:id', deleteMiniUrl);


module.exports = router;
