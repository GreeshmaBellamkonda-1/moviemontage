const express = require('express');
// const fetchDataController = require('../Controllers/fetchDataController');
const authenticationController=require('../Controllers/authenticationController');

const router = express.Router();

router.post('/signup',authenticationController.signup);
router.post('/signin',authenticationController.signin);

module.exports = router;