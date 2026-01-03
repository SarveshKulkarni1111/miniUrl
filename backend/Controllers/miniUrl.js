const miniUrlModel = require('../Models/miniUrl');
const {nanoid} = require('nanoid');

async function createMiniUrl(req, res) {
  try {
    const { longUrl } = req.body;
    const userId =  0;

    // 1️⃣ Validate input
    if (!longUrl) {
      return res.status(400).json({ error: 'longUrl is required' });
    }

    // 2️⃣ Generate short code
    const shortCode = nanoid(7); // 7–8 chars is common

    // 3️⃣ Save to DB
    const result = await miniUrlModel.createMiniUrl({
      longUrl,
      shortCode,
      userId
    });

    // 4️⃣ Build short URL
    const shortUrl = `${req.protocol}://${req.get('host')}/api/r/${shortCode}`;

    res.status(201).json({
      message: 'Short URL created',
      data: {
        id: result.insertId,
        longUrl,
        shortCode,
        shortUrl
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getMiniUrls(req, res) {
  try {

    const urls = await miniUrlModel.getAllMiniUrls();

    urls.forEach(url => {
      url.short_code = `${req.protocol}://${req.get('host')}/api/r/${url.short_code}`;
    });

    res.status(200).json({
      data: urls,
      count: urls.length
    });

  } catch (error) {
    console.error('getMiniUrls error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getMiniUrl(req, res) {
  try {
    const { id } = req.params;

    // 1️⃣ Validate input
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'Invalid URL id' });
    }

    // 2️⃣ Fetch from DB
    const miniUrl = await miniUrlModel.getMiniUrlById(Number(id));

    // 3️⃣ Handle not found
    if (!miniUrl) {
      return res.status(404).json({ error: 'URL not found' });
    }

    // 4️⃣ Success response
    res.status(200).json({
      data: miniUrl
    });

  } catch (error) {
    console.error('getMiniUrl error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function deleteMiniUrl(req, res) {
  try {
    const { id } = req.params;

    // 1️⃣ Validate input
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'Invalid URL id' });
    }

    // 2️⃣ Delete (soft delete)
    const result = await miniUrlModel.deleteMiniUrl(Number(id));

    // 3️⃣ Handle not found
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'URL not found' });
    }

    // 4️⃣ Success response
    res.status(200).json({
      message: 'URL deleted successfully'
    });

  } catch (error) {
    console.error('deleteMiniUrl error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function redirectMiniUrl(req, res) {
  try {
    const { shortCode } = req.params;

    const record = await miniUrlModel.getOriginalUrl(shortCode);

    if (!record) {
      return res.status(404).json({ message: 'URL not found or deleted' });
    }

    // Redirect to the original URL
    res.redirect(record.original_url);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  createMiniUrl,
  getMiniUrls,
  getMiniUrl,
  deleteMiniUrl,
  redirectMiniUrl
};