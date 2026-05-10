const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    judul: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
    },
    deskripsi: {
      type: String,
      required: [true, 'Please add a description'],
    },
    tag: {
      type: [String],
      required: true,
    },
    niche: {
      type: String,
      trim: true,
    },
    hook: {
      type: String,
      trim: true,
    },
    duration: {
      type: Number,
      min: 30,
      max: 120,
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Content', contentSchema);
