const Performa = require('../models/Performa');
const Content = require('../models/Content');

const createPerformance = async (req, res) => {
  try {
    const { contentId, views, likes, comments, shares, watchTime } = req.body;

    const content = await Content.findById(contentId);

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    if (content.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const performa = await Performa.create({
      content: contentId,
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
    const performance = await Performa.find({ content: req.params.contentId })
      .populate('content', 'judul')
      .sort({ recordedAt: -1 });

    res.json(performance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPerformanceAnalytics = async (req, res) => {
  try {
    const contentId = req.params.contentId;

    const performances = await Performa.find({ content: contentId }).sort({ recordedAt: 1 });

    if (performances.length === 0) {
      return res.status(404).json({ message: 'No performance data found' });
    }

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
    const performa = await Performa.findById(req.params.id).populate('content');

    if (!performa) {
      return res.status(404).json({ message: 'Performance data not found' });
    }

    if (performa.content.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    performa.views = req.body.views || performa.views;
    performa.likes = req.body.likes || performa.likes;
    performa.comments = req.body.comments || performa.comments;
    performa.shares = req.body.shares || performa.shares;
    performa.watchTime = req.body.watchTime || performa.watchTime;

    const updatedPerforma = await performa.save();
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
