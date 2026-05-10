const express = require('express');
const router = express.Router();
const {
  createPerformance,
  getPerformanceByContent,
  getPerformanceAnalytics,
  updatePerformance,
} = require('../controllers/performaController');
const { protect } = require('../middleware/auth');

router.route('/').post(protect, createPerformance);
router.route('/content/:contentId').get(protect, getPerformanceByContent);
router.route('/content/:contentId/analytics').get(protect, getPerformanceAnalytics);
router.route('/:id').put(protect, updatePerformance);

module.exports = router;
