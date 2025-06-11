const mongoose = require('mongoose');

const refeicaoSchema = new mongoose.Schema({
	refeicao: {
		type: String,
		enum: ['cafe', 'almoco', 'jantar', 'lanche'],
		required: true
	},
	itens: [{ type: String, required: true }]
}, { _id: false });

const PlanoAlimentarSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	dieta: { type: String, required: true },
	imc: { type: Number, required: true },
	classificacaoImc: { type: String, required: true },
	tmb: { type: Number, required: true },
	caloriasDiarias: { type: Number, required: true },
	consumoAguaDiario: { type: String, required: true },
	refeicoes: {
		type: [refeicaoSchema],
		required: true
	},
	recomendacoes: { type: [String], required: true },
	alimentosAEvitar: { type: [String], required: true }
}, {
	timestamps: true
});

function calcularIMC(peso, altura) {
	const alturaM = altura / 100;
	const imc = (peso / (alturaM ** 2)).toFixed(2);

	let classificacao;
	if (imc < 18.5) classificacao = 'Abaixo do peso';
	else if (imc < 25) classificacao = 'Peso normal';
	else if (imc < 30) classificacao = 'Sobrepeso';
	else classificacao = 'Obesidade';

	return { imc, classificacaoImc: classificacao };

}

function calcularTMB(peso, altura, idade, sexo) {
	let tmb = 10 * peso + 6.25 * altura - 5 * idade;
	tmb += (sexo === 'masculino') ? 5 : -161;
	return Math.round(tmb);
}

module.exports = {
	calcularIMC,
	calcularTMB,
	PlanoAlimentar: mongoose.model('PlanoAlimentar', PlanoAlimentarSchema)
};
