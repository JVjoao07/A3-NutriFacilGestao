import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

function Login() {
	const { login } = useContext(AuthContext);
	const [email, setEmail] = useState('');
	const [senha, setSenha] = useState('');
	const [erro, setErro] = useState(null);

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			// Exemplo de chamada para backend
			const response = await fetch('http://localhost:3000/api/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, senha }),
			});

			if (!response.ok) throw new Error('Login falhou');

			const data = await response.json();
			login(data.token, { email: data.email, nome: data.nome }); // salva no contexto
		} catch (err) {
			setErro(err.message);
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<h2>Login</h2>
			{erro && <p style={{ color: 'red' }}>{erro}</p>}
			<label>Email:</label>
			<input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
			<label>Senha:</label>
			<input type="password" value={senha} onChange={e => setSenha(e.target.value)} required />
			<button type="submit">Entrar</button>
		</form>
	);
}

export default Login;
