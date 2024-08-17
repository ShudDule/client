const express = require('express');
const { showHomePage } = require('../controllers/homeController');
const { ensureAuthenticated } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/home', ensureAuthenticated, showHomePage);

module.exports = router;
