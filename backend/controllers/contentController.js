const { contentHelpers, performaHelpers, userHelpers } = require('../db/helpers');

const createContent = async (req, res) => {
  try {
    const { judul, deskripsi, tag, niche, hook, duration } = req.body;

    const content = await contentHelpers.create({
      userId: req.user._id,
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
    const contents = await contentHelpers.findByUserId(req.user._id);

    // Populate user data
    const contentsWithUser = await Promise.all(
      contents.map(async (content) => {
        const user = await userHelpers.findById(content.userId);
        return {
          ...content,
          user: user ? { name: user.name, email: user.email } : null,
        };
      })
    );

    res.json(contentsWithUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getContentById = async (req, res) => {
  try {
    const content = await contentHelpers.findById(req.params.id);

    if (content) {
      const user = await userHelpers.findById(content.userId);
      res.json({
        ...content,
        user: user ? { name: user.name, email: user.email } : null,
      });
    } else {
      res.status(404).json({ message: 'Content not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateContent = async (req, res) => {
  try {
    const content = await contentHelpers.findById(req.params.id);

    if (content) {
      if (content.userId !== req.user._id) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      const updateData = {
        judul: req.body.judul || content.judul,
        deskripsi: req.body.deskripsi || content.deskripsi,
        tag: req.body.tag || content.tag,
        niche: req.body.niche || content.niche,
        hook: req.body.hook || content.hook,
        duration: req.body.duration || content.duration,
        status: req.body.status || content.status,
      };

      const updatedContent = await contentHelpers.update(req.params.id, updateData);
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
    const content = await contentHelpers.findById(req.params.id);

    if (content) {
      if (content.userId !== req.user._id) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      await contentHelpers.delete(req.params.id);
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
    const performance = await performaHelpers.findByContentId(req.params.id);

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

module.exports = {
  createContent,
  getContents,
  getContentById,
  updateContent,
  deleteContent,
  getContentPerformance,
};
