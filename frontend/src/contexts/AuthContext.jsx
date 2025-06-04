import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null); // guarda os dados do usuário (ou null)
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Verificar se token existe no localStorage e validar ele para manter login
		const token = localStorage.getItem('accessToken');
		const storedUser = localStorage.getItem('user');

		if (token && storedUser) {
			// Simplificado: considera que o token é válido
			setUser(JSON.parse(storedUser));
		}

		setLoading(false);
	}, []);

	function login(accessToken, userData) {
		localStorage.setItem('accessToken', accessToken);
		localStorage.setItem('user', JSON.stringify(userData));
		setUser(userData);
	}

	function logout() {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('user');
		setUser(null);
	}

	return (
		<AuthContext.Provider value={{ user, login, logout, loading }}>
			{children}
		</AuthContext.Provider>
	);
}
