const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/statisticsController');

router.get('/total', statisticsController.getTotalTasks);
router.get('/completed', statisticsController.getCompletedTasks);

module.exports = router;
