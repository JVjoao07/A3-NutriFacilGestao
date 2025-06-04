const express = require('express');
const router = express.Router();
const planoController = require('../controllers/planoController');
const authenticateToken = require('../middlewares/auth');

router.post('/planos', authenticateToken, planoController.criarPlano);

module.exports = router;
