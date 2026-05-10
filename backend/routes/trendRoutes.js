const express = require('express');
const router = express.Router();
const {
  getTrends,
  getTrendById,
  createTrend,
  updateTrend,
  deleteTrend,
  searchTrends,
} = require('../controllers/trendController');
const { protect, authorize } = require('../middleware/auth');

router.route('/').get(getTrends).post(protect, authorize('admin'), createTrend);
router.route('/search').get(searchTrends);
router
  .route('/:id')
  .get(getTrendById)
  .put(protect, authorize('admin'), updateTrend)
  .delete(protect, authorize('admin'), deleteTrend);

module.exports = router;
