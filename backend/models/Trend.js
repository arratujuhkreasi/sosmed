const mongoose = require('mongoose');

const trendSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ['horror', 'creepypasta', 'urban-legend', 'paranormal', 'true-crime'],
      default: 'horror',
    },
    keywords: {
      type: [String],
      required: true,
    },
    popularity: {
      type: Number,
      default: 0,
    },
    trendingScore: {
      type: Number,
      default: 0,
    },
    source: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Trend', trendSchema);
