const { trendHelpers } = require('../db/helpers');
const { db } = require('../db');
const { trends } = require('../db/schema');
const { eq, or, like, desc } = require('drizzle-orm');

const getTrends = async (req, res) => {
  try {
    const { category, limit = 10 } = req.query;

    let query = db.select().from(trends).where(eq(trends.isActive, true));
    
    if (category) {
      query = query.where(eq(trends.category, category));
    }

    const result = await query
      .orderBy(desc(trends.trendingScore), desc(trends.popularity))
      .limit(parseInt(limit));

    const trendsWithParsedKeywords = result.map(t => ({
      ...t,
      keywords: JSON.parse(t.keywords),
    }));

    res.json(trendsWithParsedKeywords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTrendById = async (req, res) => {
  try {
    const trend = await trendHelpers.findById(req.params.id);

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

    const trend = await trendHelpers.create({
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
    const trend = await trendHelpers.findById(req.params.id);

    if (trend) {
      const updateData = {
        topic: req.body.topic || trend.topic,
        category: req.body.category || trend.category,
        keywords: req.body.keywords || trend.keywords,
        popularity: req.body.popularity !== undefined ? req.body.popularity : trend.popularity,
        trendingScore: req.body.trendingScore !== undefined ? req.body.trendingScore : trend.trendingScore,
        source: req.body.source || trend.source,
        isActive: req.body.isActive !== undefined ? req.body.isActive : trend.isActive,
      };

      const updatedTrend = await trendHelpers.update(req.params.id, updateData);
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
    const trend = await trendHelpers.findById(req.params.id);

    if (trend) {
      await db.delete(trends).where(eq(trends.id, req.params.id));
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

    // SQLite LIKE search
    const result = await db.select().from(trends)
      .where(
        or(
          like(trends.topic, `%${keyword}%`),
          like(trends.keywords, `%${keyword}%`)
        )
      )
      .orderBy(desc(trends.trendingScore));

    const trendsWithParsedKeywords = result.map(t => ({
      ...t,
      keywords: JSON.parse(t.keywords),
    }));

    res.json(trendsWithParsedKeywords);
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
