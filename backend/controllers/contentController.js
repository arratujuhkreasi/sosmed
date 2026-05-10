const Content = require('../models/Content');
const Performa = require('../models/Performa');

const createContent = async (req, res) => {
  try {
    const { judul, deskripsi, tag, niche, hook, duration } = req.body;

    const content = await Content.create({
      user: req.user._id,
      judul,
      deskripsi,
      tag,
      niche,
      hook,
      duration,
    });

    res.status(201).json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getContents = async (req, res) => {
  try {
    const contents = await Content.find({ user: req.user._id })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.json(contents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getContentById = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id).populate('user', 'name email');

    if (content) {
      res.json(content);
    } else {
      res.status(404).json({ message: 'Content not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateContent = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);

    if (content) {
      if (content.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      content.judul = req.body.judul || content.judul;
      content.deskripsi = req.body.deskripsi || content.deskripsi;
      content.tag = req.body.tag || content.tag;
      content.niche = req.body.niche || content.niche;
      content.hook = req.body.hook || content.hook;
      content.duration = req.body.duration || content.duration;
      content.status = req.body.status || content.status;

      const updatedContent = await content.save();
      res.json(updatedContent);
    } else {
      res.status(404).json({ message: 'Content not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteContent = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);

    if (content) {
      if (content.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      await content.deleteOne();
      res.json({ message: 'Content removed' });
    } else {
      res.status(404).json({ message: 'Content not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getContentPerformance = async (req, res) => {
  try {
    const performance = await Performa.find({ content: req.params.id })
      .populate('content', 'judul')
      .sort({ recordedAt: -1 });

    res.json(performance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createContent,
  getContents,
  getContentById,
  updateContent,
  deleteContent,
  getContentPerformance,
};
