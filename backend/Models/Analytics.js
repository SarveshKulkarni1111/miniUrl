const db = require("./db");

async function logClickEvent({
  urlId,
  ip,
  userAgent,
  country,
  city,
  redirectTimeMs,
  referrer,
}) {
  const sql = `INSERT INTO url_click_events
    (mini_url_id, ip_hash, user_agent, country, city, redirect_time_ms, referrer)
    VALUES (?, ?, ?, ?, ?, ?, ?)`;

  await db.execute(sql, [urlId, ip, userAgent, country, city, redirectTimeMs, referrer]);
}

// Top 10 Links by clicks

async function getTopLinks() {
  const [rows] = await db.execute(`
    SELECT m.id, m.short_code, m.original_url, COUNT(c.id) AS total_clicks
    FROM mini_urls m
    JOIN url_click_events c ON c.mini_url_id = m.id
    WHERE m.is_deleted = 0
    GROUP BY m.id
    ORDER BY total_clicks DESC
    LIMIT 10
  `);
  return rows;
}

// Average clicks per link

async function getAverageClicksPerLink() {
  const [[row]] = await db.execute(`
    SELECT ROUND(COUNT(c.id) / COUNT(DISTINCT m.id), 2) AS avg_clicks_per_link
    FROM mini_urls m
    LEFT JOIN url_click_events c ON c.mini_url_id = m.id
    WHERE m.is_deleted = 0
  `);
  return row;
}

// URLs created per day (last 7 days)

async function getUrlsCreatedLast7Days() {

  const [rows] = await db.execute(`
    SELECT
    d.day,
    COALESCE(COUNT(m.id), 0) AS urls_created
    FROM (
      SELECT CURDATE() - INTERVAL 6 DAY AS day UNION ALL
      SELECT CURDATE() - INTERVAL 5 DAY UNION ALL
      SELECT CURDATE() - INTERVAL 4 DAY UNION ALL
      SELECT CURDATE() - INTERVAL 3 DAY UNION ALL
      SELECT CURDATE() - INTERVAL 2 DAY UNION ALL
      SELECT CURDATE() - INTERVAL 1 DAY UNION ALL
      SELECT CURDATE()
    ) d
    LEFT JOIN mini_urls m
      ON DATE(m.created_at) = d.day
    GROUP BY d.day
    ORDER BY d.day;

  `);
  return rows;
}

// Rate limit hits (last 7 days)

// async function getRateLimitHitsLast7Days() {
//   const [rows] = await db.execute(`
//     SELECT DATE(created_at) AS day, COUNT(*) AS hits
//     FROM rate_limit_logs
//     WHERE created_at >= CURDATE() - INTERVAL 7 DAY
//     GROUP BY day
//     ORDER BY day
//   `);
//   return rows;
// }

// Average redirect time (ms)

async function getAverageRedirectTime() {
  const [[row]] = await db.execute(`
    SELECT 
      ROUND(AVG(redirect_time_ms), 2) AS avg_redirect_time_ms
    FROM url_click_events
  `);
  return row;
}

/**
 * Geo analytics (country + city)
 */
async function getGeoAnalytics() {
  const [rows] = await db.execute(`
    SELECT 
      country,
      city,
      COUNT(*) AS clicks
    FROM url_click_events
    GROUP BY country, city
    ORDER BY clicks DESC
  `);
  return rows;
}

module.exports = {
  logClickEvent,
  getTopLinks,
  getAverageClicksPerLink,
  getUrlsCreatedLast7Days,
  //   getRateLimitHitsLast7Days,
  getAverageRedirectTime,
  getGeoAnalytics,
};
