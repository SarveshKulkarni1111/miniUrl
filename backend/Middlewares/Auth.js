const jwt = require('jsonwebtoken');
const db = require('../Models/db');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from DB
    const [[user]] = await db.execute(
      'SELECT is_active FROM users WHERE id = ? AND is_delete = 0',
      [req.user.userId]
    );

    if (!user) return res.status(401).json({ error: 'User not found' });

    if (user.is_active !== 1) {
      return res.status(403).json({ error: 'Your account has been temporarily deactivated due to excessive requests.' });
    }


    next();
  } catch {
    res.sendStatus(403);
  }
};
