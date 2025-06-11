// src/utils/fetchWithRefresh.js

export async function fetchWithRefresh(url, options = {}) {
	let accessToken = localStorage.getItem('accessToken');
	const refreshToken = localStorage.getItem('refreshToken');

	options.headers = {
		...options.headers,
		'Authorization': `Bearer ${accessToken}`,
		'Content-Type': 'application/json',
	};

	let response = await fetch(url, options);

	if (response.status === 401 && refreshToken) {
		// Tentar renovar token
		const renovarRes = await fetch('http://localhost:3000/api/refresh-token', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ refreshToken }),
		});

		if (renovarRes.ok) {
			const data = await renovarRes.json();
			accessToken = data.accessToken;
			localStorage.setItem('accessToken', accessToken);

			// Repetir requisição com novo token
			options.headers['Authorization'] = `Bearer ${accessToken}`;
			response = await fetch(url, options);
		} else {
			// Refresh token inválido - logout forçado
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
			localStorage.removeItem('user');
			window.location.href = '/login';
		}
	}

	return response;
}
