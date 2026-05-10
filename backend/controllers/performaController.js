const { performaHelpers, contentHelpers } = require('../db/helpers');

const createPerformance = async (req, res) => {
  try {
    const { contentId, views, likes, comments, shares, watchTime } = req.body;

    const content = await contentHelpers.findById(contentId);

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    if (content.userId !== req.user._id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const performa = await performaHelpers.create({
      contentId,
      views,
      likes,
      comments,
      shares,
      watchTime,
    });

    res.status(201).json(performa);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPerformanceByContent = async (req, res) => {
  try {
    const performance = await performaHelpers.findByContentId(req.params.contentId);

    // Populate content data
    const performanceWithContent = await Promise.all(
      performance.map(async (perf) => {
        const content = await contentHelpers.findById(perf.contentId);
        return {
          ...perf,
          content: content ? { judul: content.judul } : null,
        };
      })
    );

    res.json(performanceWithContent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPerformanceAnalytics = async (req, res) => {
  try {
    const contentId = req.params.contentId;

    const performances = await performaHelpers.findByContentId(contentId);

    if (performances.length === 0) {
      return res.status(404).json({ message: 'No performance data found' });
    }

    // Sort by recordedAt ascending
    performances.sort((a, b) => new Date(a.recordedAt) - new Date(b.recordedAt));

    const latest = performances[performances.length - 1];
    const totalViews = performances.reduce((sum, p) => sum + p.views, 0);
    const avgEngagement = performances.reduce((sum, p) => sum + p.engagementRate, 0) / performances.length;

    const analytics = {
      totalRecords: performances.length,
      latestPerformance: latest,
      totalViews,
      averageEngagementRate: avgEngagement.toFixed(2),
      trend: performances,
    };

    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePerformance = async (req, res) => {
  try {
    const performa = await performaHelpers.findById(req.params.id);

    if (!performa) {
      return res.status(404).json({ message: 'Performance data not found' });
    }

    const content = await contentHelpers.findById(performa.contentId);

    if (!content || content.userId !== req.user._id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updateData = {
      views: req.body.views !== undefined ? req.body.views : performa.views,
      likes: req.body.likes !== undefined ? req.body.likes : performa.likes,
      comments: req.body.comments !== undefined ? req.body.comments : performa.comments,
      shares: req.body.shares !== undefined ? req.body.shares : performa.shares,
      watchTime: req.body.watchTime !== undefined ? req.body.watchTime : performa.watchTime,
    };

    const updatedPerforma = await performaHelpers.update(req.params.id, updateData);
    res.json(updatedPerforma);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPerformance,
  getPerformanceByContent,
  getPerformanceAnalytics,
  updatePerformance,
};
