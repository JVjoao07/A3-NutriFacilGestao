const mongoose = require('mongoose');

const PlanoAlimentarSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // referência ao usuário
	dieta: { type: String, required: true },
	imc: { type: Number, required: true },
	classificacaoImc: { type: String, required: true },
	tmb: { type: Number, required: true },
	caloriasDiarias: { type: Number, required: true },
	consumoAguaDiario: { type: String, required: true },
	refeicoes: {
		type: [String], // array de strings
		required: true
	},
	recomendacoes: { type: [String], required: true },
	alimentosAEvitar: { type: [String], required: true },
}, {
	timestamps: true
});

module.exports = mongoose.model('PlanoAlimentar', PlanoAlimentarSchema);
