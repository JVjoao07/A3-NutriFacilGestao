import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css'; // Importa o CSS

function Login() {
	const { login } = useContext(AuthContext);
	const [email, setEmail] = useState('');
	const [senha, setSenha] = useState('');
	const [erro, setErro] = useState(null);
	const navigate = useNavigate()

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			const response = await fetch('http://localhost:3000/api/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, senha }),
			});

			if (!response.ok) throw new Error('Login falhou');

			const data = await response.json();

			login(data.accessToken, data.user);
			navigate('/')
		} catch (err) {
			setErro(err.message);
		}
	}


	return (
		<form onSubmit={handleSubmit}>

			<h2>Login</h2>

			<p style={{ textAlign: 'center', marginBottom: '20px' }}>
				Não tem uma conta?{' '}
				<Link to="/register" style={{ color: '#4a90e2', textDecoration: 'none' }}>
					Registre aqui
				</Link>
			</p>

			{erro && <p className="error">{erro}</p>}

			<label>Email:</label>
			<input
				type="email"
				value={email}
				onChange={e => setEmail(e.target.value)}
				required
			/>

			<label>Senha:</label>
			<input
				type="password"
				value={senha}
				onChange={e => setSenha(e.target.value)}
				required
			/>

			<button type="submit">Entrar</button>
		</form>
	);
}

export default Login;
