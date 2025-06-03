const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1]; // Formato: "Bearer TOKEN"

	if (!token) return res.status(401).json({ message: 'Token não encontrado!' });

	jwt.verify(token, JWT_SECRET, (err, user) => {
		if (err) return res.status(403).json({ message: 'Token inválido!' });

		req.user = user;
		next();
	});
}

module.exports = authenticateToken;
