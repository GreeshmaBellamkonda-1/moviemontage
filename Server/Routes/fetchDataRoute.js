const express = require('express');
const fetchDataController = require('../Controllers/fetchDataController');

const router = express.Router();

router.get('/fetchMovieData',fetchDataController.fetchMovieData);
router.get('/fetchReviewData',fetchDataController.fetchReviewData);

module.exports = router;