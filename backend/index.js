const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Simulando banco de dados em memória
let users = [];

// Rota de cadastro
app.post('/register', async (req, res) => {
	const { username, password } = req.body;

	// Verifica se usuário já existe
	const userExists = users.find(user => user.username === username);
	if (userExists) {
		return res.status(400).json({ message: 'Usuário já existe!' });
	}

	// Criptografar senha
	const hashedPassword = await bcrypt.hash(password, 10);

	// Salvar usuário
	users.push({ username, password: hashedPassword });
	res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
});

// Rota de login
app.post('/login', async (req, res) => {
	const { username, password } = req.body;

	// Encontrar usuário
	const user = users.find(user => user.username === username);
	if (!user) {
		return res.status(400).json({ message: 'Usuário não encontrado!' });
	}

	// Verificar senha
	const validPassword = await bcrypt.compare(password, user.password);
	if (!validPassword) {
		return res.status(400).json({ message: 'Senha incorreta!' });
	}

	res.status(200).json({ message: 'Login bem-sucedido!' });
});

// Iniciar servidor
app.listen(PORT, () => {
	console.log(`Servidor rodando na porta ${PORT}`);
});