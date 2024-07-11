const express = require('express');
const deleteReviewController = require('../Controllers/deleteReviewController');
const createReviewController =require('../Controllers/createReviewController');
const updateReviewController =require('../Controllers/updateReviewController');
const router = express.Router();

router.post('/postReview', createReviewController);
router.put('/updateReview', updateReviewController.updateReview);
router.delete('/deleteReview', deleteReviewController);

module.exports = router;
