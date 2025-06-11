import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
	const { user, loading } = useContext(AuthContext);

	console.log(user)

	if (loading) return <div>Carregando...</div>;

	if (!user) {
		// Redireciona para /login se o usuário não estiver logado
		return <Navigate to="/login" replace />;
	}

	// Se estiver logado, renderiza o conteúdo protegido
	return children;
}

export default PrivateRoute;
