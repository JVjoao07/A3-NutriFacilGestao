const mongoose = require('mongoose');

const PlanoAlimentarSchema = new mongoose.Schema({
	dieta: { type: String, required: true },
	imc: { type: Number, required: true },
	classificacaoImc: { type: String, required: true },
	tmb: { type: Number, required: true }, // Taxa Metabólica Basal
	caloriasDiarias: { type: Number, required: true },
	consumoAguaDiario: { type: String, required: true }, // ex: '2.5 litros'

	refeicoes: {
		cafeDaManha: { type: String, required: true },
		lancheDaManha: { type: String, required: true },
		almoco: { type: String, required: true },
		lancheDaTarde: { type: String, required: true },
		jantar: { type: String, required: true },
		ceia: { type: String, required: true },
	},

	recomendacoes: { type: [String], required: true },
	alimentosAEvitar: { type: [String], required: true },
},
	{
		timestamps: true
	});

module.exports = mongoose.model('PlanoAlimentar', PlanoAlimentarSchema);
