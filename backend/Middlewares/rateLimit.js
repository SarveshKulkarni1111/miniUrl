const redis = require("../Models/redis");

const WINDOW_SECONDS = 60; // 1 minute
const MAX_REQUESTS = 10; // per window

module.exports = async function rateLimit(req, res, next) {
  try {
    const userId = req.user?.userId;
    const ip = req.ip;

    // Prefer user-based limiting, fallback to IP
    const key = userId ? `rate:user:${userId}` : `rate:ip:${ip}`;

    // Atomic increment
    const current = await redis.incr(key);

    // First request → set expiry
    if (current === 1) {
      await redis.expire(key, WINDOW_SECONDS);
    }

    if (current > MAX_REQUESTS) {
      await db.execute("UPDATE users SET is_active = 0 WHERE id = ?", [userId]);

      return res.status(429).json({
        error: "Too many requests. Please try again later.",
      });
    }

    next();
  } catch (err) {
    // Fail open → do not block users if Redis fails
    console.error("Rate limit error:", err);
    next();
  }
};
