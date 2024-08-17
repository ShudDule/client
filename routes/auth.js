const express = require('express');
const { showRegisterPage, registerUser, showLoginPage, loginUser, logoutUser } = require('../controllers/authController');

const router = express.Router();

router.get('/register', showRegisterPage);
router.post('/register', registerUser);
router.get('/login', showLoginPage);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

module.exports = router;
