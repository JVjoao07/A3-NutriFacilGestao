import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.css'; // Reaproveitando o estilo do login

function Register() {
	const { login } = useContext(AuthContext);
	const [nome, setNome] = useState('');
	const [email, setEmail] = useState('');
	const [senha, setSenha] = useState('');
	const [confirmSenha, setConfirmSenha] = useState('');
	const [erro, setErro] = useState(null);
	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();

		if (senha !== confirmSenha) {
			setErro('As senhas não coincidem');
			return;
		}

		try {
			const response = await fetch('http://localhost:3000/api/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ nome, email, senha }),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || 'Registro falhou');
			}

			const data = await response.json();

			// Após registro, loga automaticamente
			login(data.accessToken, data.user);
			navigate('/');
		} catch (err) {
			setErro(err.message);
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<h2>Registrar</h2>

			<p style={{ textAlign: 'center', marginBottom: '20px' }}>
				Já tem uma conta?{' '}
				<Link to="/login" style={{ color: '#4a90e2', textDecoration: 'none' }}>
					Entrar aqui
				</Link>
			</p>

			{erro && <p className="error">{erro}</p>}

			<label>Nome:</label>
			<input
				type="text"
				value={nome}
				onChange={e => setNome(e.target.value)} // Corrigido aqui!
				required
			/>

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
				minLength={6}
			/>

			<label>Confirme a senha:</label>
			<input
				type="password"
				value={confirmSenha}
				onChange={e => setConfirmSenha(e.target.value)}
				required
				minLength={6}
			/>

			<button type="submit">Registrar</button>
		</form>
	);
}

export default Register;
