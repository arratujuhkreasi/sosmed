const Trend = require('../models/Trend');

const getTrends = async (req, res) => {
  try {
    const { category, limit = 10 } = req.query;

    const query = { isActive: true };
    if (category) {
      query.category = category;
    }

    const trends = await Trend.find(query)
      .sort({ trendingScore: -1, popularity: -1 })
      .limit(parseInt(limit));

    res.json(trends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTrendById = async (req, res) => {
  try {
    const trend = await Trend.findById(req.params.id);

    if (trend) {
      res.json(trend);
    } else {
      res.status(404).json({ message: 'Trend not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTrend = async (req, res) => {
  try {
    const { topic, category, keywords, popularity, trendingScore, source } = req.body;

    const trend = await Trend.create({
      topic,
      category,
      keywords,
      popularity,
      trendingScore,
      source,
    });

    res.status(201).json(trend);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTrend = async (req, res) => {
  try {
    const trend = await Trend.findById(req.params.id);

    if (trend) {
      trend.topic = req.body.topic || trend.topic;
      trend.category = req.body.category || trend.category;
      trend.keywords = req.body.keywords || trend.keywords;
      trend.popularity = req.body.popularity || trend.popularity;
      trend.trendingScore = req.body.trendingScore || trend.trendingScore;
      trend.source = req.body.source || trend.source;
      trend.isActive = req.body.isActive !== undefined ? req.body.isActive : trend.isActive;

      const updatedTrend = await trend.save();
      res.json(updatedTrend);
    } else {
      res.status(404).json({ message: 'Trend not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTrend = async (req, res) => {
  try {
    const trend = await Trend.findById(req.params.id);

    if (trend) {
      await trend.deleteOne();
      res.json({ message: 'Trend removed' });
    } else {
      res.status(404).json({ message: 'Trend not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchTrends = async (req, res) => {
  try {
    const { keyword } = req.query;

    if (!keyword) {
      return res.status(400).json({ message: 'Keyword is required' });
    }

    const trends = await Trend.find({
      $or: [
        { topic: { $regex: keyword, $options: 'i' } },
        { keywords: { $in: [new RegExp(keyword, 'i')] } },
      ],
      isActive: true,
    }).sort({ trendingScore: -1 });

    res.json(trends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTrends,
  getTrendById,
  createTrend,
  updateTrend,
  deleteTrend,
  searchTrends,
};
