const router = require('express').Router();
const { signup, login } = require('../Controllers/Auth');

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
