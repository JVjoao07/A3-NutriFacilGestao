const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/auth');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/refresh', userController.refreshToken);

// Protegida com JWT
router.get('/users', authenticateToken, userController.getAll);
router.get('/user/:userId', authenticateToken, userController.getUser)
router.get('/users/:userId/dieta', userController.getUserWithDieta);

module.exports = router;
