const express = require('express');
const router = express.Router();
const Auth = require('../middlewares/Auth');
const {createMiniUrl, getMiniUrls, getMiniUrl, deleteMiniUrl, redirectMiniUrl} = require('../Controllers/miniUrl');

router.post('/miniUrl', Auth, createMiniUrl);
router.get('/miniUrl', Auth, getMiniUrls);
router.get('/r/:shortCode', Auth, redirectMiniUrl);
router.get('/:id', Auth, getMiniUrl);
router.post('/:id', Auth, deleteMiniUrl);


module.exports = router;
