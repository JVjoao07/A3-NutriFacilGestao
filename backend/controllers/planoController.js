const PlanoAlimentar = require('../models/planoAlimentar');
const User = require('../models/user');

exports.criarPlano = async (req, res) => {

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

		if (!Array.isArray(recomendacoes) || !Array.isArray(alimentosAEvitar)) {
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

		await plano.save();
		await User.findByIdAndUpdate(userId, { dieta: plano._id });

		res.status(201).json(plano);

	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
