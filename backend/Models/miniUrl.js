const db = require('./db');

async function createMiniUrl(data) {
    const query = `
      INSERT INTO mini_urls  (original_url, short_code, created_by)
      VALUES (?, ?, ?)
    `;
    const values = [
      data.longUrl,
      data.shortCode,
      data.userId
    ];
    const [result] = await db.execute(query, values);
    return result;
  }
  
  async function getAllMiniUrls() {
    const query = `SELECT id, original_url, short_code, redirect_count
    FROM mini_urls 
    WHERE is_deleted = 0`;
    const [rows] = await db.query(query);
    return rows;
  }
  
  async function getMiniUrlById(id) {
    const query = `SELECT id, original_url, short_code 
    FROM mini_urls 
    WHERE id = ? AND is_deleted = 0`;
    const [rows] = await db.execute(query, [id]);
    return rows[0];
  }

    async function deleteMiniUrl(id) {
    // Soft delete by setting isdel=1
    const query = 'UPDATE mini_urls SET is_deleted = 1 WHERE id = ?';
    const [result] = await db.execute(query, [id]);
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
    getOriginalUrl
  };