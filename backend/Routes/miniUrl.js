const express = require('express');
const router = express.Router();
const Auth = require('../Middlewares/Auth');
const redirectRateLimit = require('../Middlewares/redirectRateLimit');
const {createMiniUrl, getMiniUrls, getMiniUrl, deleteMiniUrl, redirectMiniUrl} = require('../Controllers/miniUrl');

router.post('/miniUrl', Auth, createMiniUrl);
router.get('/miniUrl', Auth, getMiniUrls);
router.get('/r/:shortCode', redirectRateLimit, redirectMiniUrl);
router.get('/:id', Auth, getMiniUrl);
router.post('/:id', Auth, deleteMiniUrl);

// router.post('/miniUrl', createMiniUrl);
// router.get('/miniUrl', getMiniUrls);
// router.get('/r/:shortCode', redirectMiniUrl);
// router.get('/:id', getMiniUrl);
// router.post('/:id', deleteMiniUrl);


module.exports = router;
