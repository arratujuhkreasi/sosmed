const express = require('express');
const router = express.Router();
const {
  createContent,
  getContents,
  getContentById,
  updateContent,
  deleteContent,
  getContentPerformance,
} = require('../controllers/contentController');
const { protect } = require('../middleware/auth');

router.route('/').post(protect, createContent).get(protect, getContents);
router
  .route('/:id')
  .get(protect, getContentById)
  .put(protect, updateContent)
  .delete(protect, deleteContent);
router.route('/:id/performance').get(protect, getContentPerformance);

module.exports = router;
