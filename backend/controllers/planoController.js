const { PlanoAlimentar } = require('../models/planoAlimentar');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { gerarPlanoAlimentar } = require('../services/geradorDeReceitas');

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

exports.criarPlano = async (req, res) => {
	try {
		const planoGerado = gerarPlanoAlimentar(req.body);
		const userId = req.user.id;

		// Criar documento para salvar no banco
		const plano = new PlanoAlimentar({
			user: userId,
			...planoGerado
		});

		await plano.save();

		// Atualizar o usuário com o ID do novo plano
		await User.findByIdAndUpdate(userId, { planos: plano._id });

		res.status(200).json(plano);
	} catch (err) {
		console.error(err);
		res.status(500).json({ erro: 'Erro ao gerar plano' });
	}
};

exports.deletarPlano = async (req, res) => {
	try {
		const userId = req.user.id;

		// Verifica se o plano existe
		const plano = await PlanoAlimentar.findOne({ user: userId });

		if (!plano) {
			return res.status(404).json({ mensagem: 'Nenhum plano alimentar encontrado para deletar' });
		}

		// Remove o plano alimentar
		await PlanoAlimentar.deleteOne({ user: userId });

		// Atualiza o usuário para remover o vínculo com o plano (caso use o campo `planos`)
		await User.findByIdAndUpdate(userId, { $unset: { planos: '' } });

		return res.status(200).json({ mensagem: 'Plano alimentar deletado com sucesso' });
	} catch (error) {
		console.error('Erro ao deletar plano alimentar:', error);
		return res.status(500).json({ mensagem: 'Erro interno do servidor' });
	}
};