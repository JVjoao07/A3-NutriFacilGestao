require('dotenv').config();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

exports.register = async (req, res) => {
	const { nome, email, senha, dieta } = req.body;

	try {
		const existingUser = await User.findOne({ email });
		if (existingUser) return res.status(400).json({ message: 'Email já cadastrado!' });

		const hashedPassword = await bcrypt.hash(senha, 10);
		const newUser = new User({ nome, email, senha: hashedPassword, dieta });

		await newUser.save();

		res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

exports.login = async (req, res) => {
	const { email, senha } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) return res.status(400).json({ message: 'Usuário não encontrado!' });

		const valid = await bcrypt.compare(senha, user.senha);
		if (!valid) return res.status(400).json({ message: 'Senha incorreta!' });

		// Gera access token
		const accessToken = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });

		// Gera refresh token
		const refreshToken = jwt.sign({ id: user._id, email: user.email }, JWT_REFRESH_SECRET, { expiresIn: '7d' });

		res.json({
			message: 'Login bem-sucedido!',
			accessToken,
			refreshToken,
			user: { nome: user.nome, email: user.email, dieta: user.dieta }
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

exports.getAll = async (req, res) => {
	try {
		const users = await User.find().select('-senha'); // Oculta a senha
		res.json(users);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

exports.refreshToken = (req, res) => {
	const { refreshToken } = req.body;

	if (!refreshToken) {
		return res.status(401).json({ message: 'Refresh token obrigatório!' });
	}

	jwt.verify(refreshToken, JWT_REFRESH_SECRET, (err, user) => {
		if (err) return res.status(403).json({ message: 'Refresh token inválido!' });

		// Gera novo access token
		const accessToken = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '15m' });

		res.json({ accessToken });
	});
};

exports.getUserWithDieta = async (req, res) => {
	try {
		const { userId } = req.params; // exemplo: pega id da URL

		const user = await User.findById(userId).populate('dieta').exec();

		if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

		// Retorna o usuário e o plano alimentar completo
		res.json({
			nome: user.nome,
			email: user.email,
			dieta: user.dieta // aqui vem o objeto do plano alimentar populado
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};


