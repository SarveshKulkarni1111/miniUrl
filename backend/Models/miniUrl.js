const db = require("./db");

async function createMiniUrl(data, userId) {
  const query = `
      INSERT INTO mini_urls  (original_url, short_code, created_by, user_id)
      VALUES (?, ?, ?, ?)
    `;
  const values = [data.longUrl, data.shortCode, data.userId, userId];
  const [result] = await db.execute(query, values);
  return result;
}

async function getAllMiniUrls(userId) {
  const query = `SELECT id, original_url, short_code, redirect_count
    FROM mini_urls 
    WHERE user_id = ? AND is_deleted = 0`;
  const [rows] = await db.execute(query, [userId]);
  return rows;
}

async function getMiniUrlById(id, userId) {
  const query = `SELECT id, original_url, short_code 
    FROM mini_urls 
    WHERE id = ? AND user_id = ? AND is_deleted = 0`;
  const [rows] = await db.execute(query, [id, userId]);
  return rows[0];
}

async function deleteMiniUrl(id, userId) {
  // Soft delete by setting isdel=1
  const query =
    "UPDATE mini_urls SET is_deleted = 1 WHERE id = ? AND user_id = ?";
  const [result] = await db.execute(query, [id, userId]);
  return result;
}

async function getOriginalUrl(shortCode) {
  // 1️⃣ Fetch URL (and ensure not deleted)
  const selectQuery = `
    SELECT id, original_url
    FROM mini_urls
    WHERE short_code = ? AND is_deleted = 0
  `;

  const [[record]] = await db.execute(selectQuery, [shortCode]);

  if (!record) {
    return null;
  }

  // 2️⃣ Increment redirect count
  const updateQuery = `
    UPDATE mini_urls
    SET redirect_count = redirect_count + 1
    WHERE id = ?
  `;

  await db.execute(updateQuery, [record.id]);

  return record; // { id, original_url }
}

module.exports = {
  createMiniUrl,
  getAllMiniUrls,
  getMiniUrlById,
  deleteMiniUrl,
  getOriginalUrl,
};
