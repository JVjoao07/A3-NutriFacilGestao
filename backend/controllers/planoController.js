const PlanoAlimentar = require('../models/planoAlimentar');

exports.criarPlano = async (req, res) => {
	try {
		// req.body deve conter exatamente as chaves do schema
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

		// Validação simples (pode melhorar com bibliotecas tipo Joi ou Yup)
		if (!dieta || !imc || !classificacaoImc || !tmb || !caloriasDiarias || !consumoAguaDiario) {
			return res.status(400).json({ error: 'Campos básicos obrigatórios faltando.' });
		}

		if (!refeicoes || typeof refeicoes !== 'object') {
			return res.status(400).json({ error: 'Refeições inválidas ou faltando.' });
		}

		if (!Array.isArray(recomendacoes) || !Array.isArray(alimentosAEvitar)) {
			return res.status(400).json({ error: 'Recomendações e alimentos a evitar devem ser arrays.' });
		}

		// Criar novo plano alimentar
		const plano = new PlanoAlimentar({
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

		res.status(201).json(plano);

	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
