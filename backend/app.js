const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const planoRoutes = require('./routes/planoRoutes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

// Middlewares
app.use(bodyParser.json());

// Rotas
app.use('/api', userRoutes);
app.use('/api', planoRoutes);

// Conexão com MongoDB local
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(() => console.log('MongoDB conectado'))
	.catch(err => console.log('Erro ao conectar MongoDB:', err));
