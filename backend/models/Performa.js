const mongoose = require('mongoose');

const performaSchema = new mongoose.Schema(
  {
    content: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Content',
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
    },
    shares: {
      type: Number,
      default: 0,
    },
    watchTime: {
      type: Number,
      default: 0,
    },
    engagementRate: {
      type: Number,
      default: 0,
    },
    recordedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

performaSchema.pre('save', function (next) {
  if (this.views > 0) {
    this.engagementRate = ((this.likes + this.comments + this.shares) / this.views) * 100;
  }
  next();
});

module.exports = mongoose.model('Performa', performaSchema);
