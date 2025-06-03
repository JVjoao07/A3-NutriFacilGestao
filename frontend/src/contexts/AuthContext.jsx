import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null); // guarda os dados do usuário (ou null)
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Verificar se token existe no localStorage e validar ele para manter login
		const token = localStorage.getItem('token');
		if (token) {
			// A fazer
			// simplificado, normalmente pega dados do backend
		}
		setLoading(false);
	}, []);

	function login(token, userData) {
		localStorage.setItem('token', token);
		setUser(userData);
	}

	function logout() {
		localStorage.removeItem('token');
		setUser(null);
	}

	return (
		<AuthContext.Provider value={{ user, login, logout, loading }}>
			{children}
		</AuthContext.Provider>
	);
}
