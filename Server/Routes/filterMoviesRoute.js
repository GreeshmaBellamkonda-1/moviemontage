const express = require('express');
const filterMovies = require('../Controllers/filterMovies');

const router=express.Router();

router.get('/filterMovies', filterMovies);

module.exports = router;