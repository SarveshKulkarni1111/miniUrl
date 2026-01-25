const redis = require("../Models/redis");

const WINDOW = 60;
const LIMIT = 300; // higher for redirects

module.exports = async (req, res, next) => {
  try {

    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket.remoteAddress ||
      req.ip;
      
    const key = `rate:redirect:${ip}`;
    const count = await redis.incr(key);

    if (count === 1) {
      await redis.expire(key, WINDOW);
    }

    if (count > LIMIT) {
      return res.status(429).send("Too many requests");
    }

    next();
  } catch {
    next();
  }
};
