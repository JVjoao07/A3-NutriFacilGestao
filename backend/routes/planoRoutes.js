const express = require('express');
const router = express.Router();
const planoController = require('../controllers/planoController');

router.post('/planos', planoController.criarPlano);

module.exports = router;
