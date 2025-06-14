const express = require('express');
const router = express.Router();
const planoController = require('../controllers/planoController');
const authenticateToken = require('../middlewares/auth');

router.post('/plano', authenticateToken, planoController.criarPlano);
router.get('/plano', authenticateToken, planoController.getPlanoAlimentar);
router.delete('/plano', authenticateToken, planoController.deletarPlano);

module.exports = router;
