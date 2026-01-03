const express = require('express');
const router = express.Router();
const {createMiniUrl, getMiniUrls, getMiniUrl, deleteMiniUrl, redirectMiniUrl} = require('../Controllers/miniUrl');

router.post('/miniUrl', createMiniUrl);
router.get('/miniUrl', getMiniUrls);
router.get('/r/:shortCode', redirectMiniUrl);
router.get('/:id', getMiniUrl);
router.post('/:id', deleteMiniUrl);


module.exports = router;
