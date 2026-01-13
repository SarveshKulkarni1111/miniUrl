const analyticsModel = require('../Models/Analytics');

async function getDashboardAnalytics(req, res) {
  try {
    const [
      topLinks,
      avgClicks,
      urlsCreated,
    //   rateLimitHits,
      redirectTime,
      geoAnalytics
    ] = await Promise.all([
      analyticsModel.getTopLinks(),
      analyticsModel.getAverageClicksPerLink(),
      analyticsModel.getUrlsCreatedLast7Days(),
    //   analyticsModel.getRateLimitHitsLast7Days(),
      analyticsModel.getAverageRedirectTime(),
      analyticsModel.getGeoAnalytics()
    ]);

    res.json({
      topLinks,
      averageClicksPerLink: avgClicks.avg_clicks_per_link,
      urlsCreatedLast7Days: urlsCreated,
    //   rateLimitHitsLast7Days: rateLimitHits,
      averageRedirectTimeMs: redirectTime.avg_redirect_time_ms,
      geoAnalytics
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Failed to fetch analytics'
    });
  }
}

module.exports = {
  getDashboardAnalytics
};
