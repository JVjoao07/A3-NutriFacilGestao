const PlanoAlimentar = require('../models/planoAlimentar');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.criarPlano = async (req, res) => {

	console.log(req.body)

	try {
		const {
			dieta,
			imc,
			classificacaoImc,
			tmb,
			caloriasDiarias,
			consumoAguaDiario,
			refeicoes,
			recomendacoes,
			alimentosAEvitar
		} = req.body;

		// Validação simples
		if (!dieta || !imc || !classificacaoImc || !tmb || !caloriasDiarias || !consumoAguaDiario) {
			return res.status(400).json({ error: 'Campos básicos obrigatórios faltando.' });
		}

		if (!refeicoes || typeof refeicoes !== 'object') {
			return res.status(400).json({ error: 'Refeições inválidas ou faltando.' });
		}

		// RECOMENDACOES ARRAY
		if (!Array.isArray(alimentosAEvitar)) {
			return res.status(400).json({ error: 'Recomendações e alimentos a evitar devem ser arrays.' });
		}

		// Aqui vem o ID do usuário autenticado, assumindo que middleware setou em req.user.id
		const userId = req.user.id;

		// Criar novo plano alimentar já associado ao usuário
		const plano = new PlanoAlimentar({
			user: userId, // associando o plano ao usuário
			dieta,
			imc,
			classificacaoImc,
			tmb,
			caloriasDiarias,
			consumoAguaDiario,
			refeicoes,
			recomendacoes,
			alimentosAEvitar
		});

		// 
		await plano.save();
		await User.findByIdAndUpdate(userId, { dieta: plano._id });

		res.status(201).json(plano);

	} catch (err) {
		console.error('Erro ao salvar plano alimentar:', err);
		res.status(500).json({ error: err.message });
	}
};

exports.getPlanoAlimentar = async (req, res) => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader) {
			return res.status(401).json({ mensagem: 'Token não fornecido' });
		}

		const token = authHeader.split(' ')[1];

		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const userId = decoded.id;  // ajuste conforme você define no payload do token

		const plano = await PlanoAlimentar.findOne({ user: userId });

		if (!plano) {
			return res.status(404).json({ mensagem: 'Nenhum plano alimentar encontrado' });
		}

		return res.status(200).json(plano);
	} catch (error) {
		console.error('Erro ao buscar plano alimentar:', error);
		return res.status(500).json({ mensagem: 'Erro interno do servidor' });
	}
};