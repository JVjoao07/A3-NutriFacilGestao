const express = require('express');
const router = express.Router();
const planoController = require('../controllers/planoController');
const authenticateToken = require('../middlewares/auth');

router.post('/planos', authenticateToken, planoController.criarPlano);
router.post('/plano', authenticateToken, planoController.criarPlano2);
router.get('/plano', authenticateToken, planoController.getPlanoAlimentar);

module.exports = router;
