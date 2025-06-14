const { calcularIMC, calcularTMB } = require('../models/planoAlimentar');

const alimentosPorDieta = {
	mediterranea: {
		proteinas: ['peixe', 'frango', 'ovo', 'tofu', 'atum', 'camarão', 'iogurte', 'queijo'],
		vegetais: ['brócolis', 'berinjela', 'tomate', 'pimentão', 'couve-flor', 'abobrinha'],
		verduras: ['alface', 'rúcula', 'espinafre', 'agrião'],
		carboidratos: ['arroz integral', 'batata doce', 'quinoa', 'grão de bico', 'macarrão', 'pão integral', 'aveia'],
		frutas: ['laranja', 'mamão', 'morango', 'banana', 'abacate'],
		oleaginosas: ['azeite', 'castanhas', 'nozes', 'amêndoas']
	},
	lowcarb: {
		proteinas: ['carne bovina', 'frango', 'ovo', 'peixe', 'tofu'],
		vegetais: ['brócolis', 'abobrinha', 'couve-flor'],
		verduras: ['alface', 'rúcula', 'espinafre'],
		carboidratos: [],
		frutas: ['morango', 'abacate'],
		oleaginosas: ['azeite', 'castanhas', 'nozes', 'amêndoas']
	},
	vegetariana: {
		proteinas: ['tofu', 'grão de bico', 'feijão', 'lentilha', 'ovos', 'queijo'],
		vegetais: ['brócolis', 'cenoura', 'abobrinha'],
		verduras: ['alface', 'rúcula', 'espinafre'],
		carboidratos: ['arroz integral', 'batata doce', 'quinoa'],
		frutas: ['banana', 'mamão', 'laranja'],
		oleaginosas: ['castanhas', 'nozes', 'amêndoas', 'azeite']
	},
	cetogenica: {
		proteinas: ['carne bovina', 'frango', 'ovo', 'peixe'],
		vegetais: ['brócolis', 'abobrinha', 'couve-flor'],
		verduras: ['alface', 'rúcula', 'espinafre'],
		carboidratos: [],
		frutas: ['abacate', 'morango'],
		oleaginosas: ['azeite', 'castanhas', 'nozes', 'amêndoas']
	}
};

const relacoesAlergenos = {
	soja: ['tofu'],
	leite: ['queijo', 'iogurte'],
	lactose: ['queijo', 'iogurte'],
	gluten: ['pão integral', 'aveia', 'macarrão'],
	frutos_do_mar: ['camarão', 'atum'],
	ovo: ['ovo'],
	amendoim: ['amendoim']
};

function gerarRecomendacoes(objetivo, imc) {
	const recomendacoes = [];

	// Regras principais por objetivo
	if (objetivo === 'emagrecimento') {
		recomendacoes.push('Manter um déficit calórico moderado, focando em alimentos naturais e integrais.');
		if (imc >= 25) {
			recomendacoes.push('Seu IMC indica sobrepeso, então é importante reduzir a ingestão calórica e aumentar a prática de atividades físicas.');
		}
	} else if (objetivo === 'hipertrofia') {
		if (imc >= 25) {
			recomendacoes.push('Apesar do objetivo de ganho muscular, seu IMC está elevado. Monitore os ganhos com cuidado para evitar aumento excessivo de gordura.');
			recomendacoes.push('Priorize a ingestão adequada de proteínas e treinos de força.');
		} else {
			recomendacoes.push('Para hipertrofia, mantenha um superávit calórico com boa ingestão de proteínas e carboidratos complexos.');
		}
	} else if (objetivo === 'manutencao') {
		recomendacoes.push('Manter uma dieta equilibrada com variedade de alimentos naturais.');
	} else if (objetivo === 'saude') {
		recomendacoes.push('Priorizar alimentos naturais e reduzir o consumo de açúcares, processados e gorduras saturadas.');
	}

	// Recomendações gerais baseadas só no IMC
	if (imc < 18.5) {
		recomendacoes.push('Seu IMC indica baixo peso. Considere aumentar a ingestão de calorias e proteínas.');
	} else if (imc >= 30) {
		recomendacoes.push('Seu IMC indica obesidade. É essencial buscar acompanhamento nutricional e manter uma rotina ativa.');
	}

	return recomendacoes;
}


function gerarPlanoAlimentar(dados) {
	const {
		peso,
		altura,
		idade,
		sexo,
		dieta,
		objetivo,
		proteinas = [],
		vegetais = [],
		verduras = [],
		carboidratos = [],
		frutas = [],
		oleaginosas = ['castanhas', 'nozes', 'amêndoas'],
		alergias = [],
		outrasAlergias = ''
	} = dados;

	const { imc, classificacaoImc } = calcularIMC(peso, altura);
	const tmb = calcularTMB(peso, altura, idade, sexo);

	const permitidos = alimentosPorDieta[dieta];
	if (!permitidos) throw new Error('Dieta inválida ou não suportada.');

	// Montar lista de alimentos a evitar
	const alimentosAEvitar = [...alergias];
	if (outrasAlergias) alimentosAEvitar.push(outrasAlergias);

	// Incluir os alimentos derivados dos alérgenos
	alergias.forEach(alergia => {
		if (relacoesAlergenos[alergia]) {
			alimentosAEvitar.push(...relacoesAlergenos[alergia]);
		}
	});

	const filtrarPermitidosSemAlergia = (categoria) => {
		return (permitidos[categoria] || []).filter(item => !alimentosAEvitar.includes(item));
	};

	const proteinasFiltradas = filtrarPermitidosSemAlergia('proteinas');
	const vegetaisFiltrados = filtrarPermitidosSemAlergia('vegetais');
	const verdurasFiltradas = filtrarPermitidosSemAlergia('verduras');
	const carboidratosFiltrados = filtrarPermitidosSemAlergia('carboidratos');
	const frutasFiltradas = filtrarPermitidosSemAlergia('frutas');
	const oleaginosasFiltradas = filtrarPermitidosSemAlergia('oleaginosas');

	let caloriasDiarias = tmb;
	if (objetivo === 'emagrecimento') caloriasDiarias -= 500;
	else if (objetivo === 'hipertrofia') caloriasDiarias += 500;
	caloriasDiarias = Math.round(caloriasDiarias);

	const consumoAguaDiario = Math.round(peso * 35);

	const recomendacoes = gerarRecomendacoes(objetivo, imc);

	const refeicoes = gerarRefeicoes({
		proteinas: proteinasFiltradas,
		vegetais: vegetaisFiltrados,
		verduras: verdurasFiltradas,
		carboidratos: carboidratosFiltrados,
		frutas: frutasFiltradas,
		oleaginosas: oleaginosasFiltradas
	});

	return {
		dieta,
		imc,
		classificacaoImc,
		tmb: Math.round(tmb),
		caloriasDiarias,
		consumoAguaDiario,
		refeicoes,
		recomendacoes,
		alimentosAEvitar
	};
}

function escolherAleatorio(lista) {
	return lista[Math.floor(Math.random() * lista.length)];
}

function gerarRefeicoes({ proteinas, vegetais, verduras, carboidratos, frutas, oleaginosas }) {
	const refeicoes = [];
	const usados = [];

	const alimentosPorRefeicao = {
		'Café da Manhã': {
			proteinas: ['ovo', 'queijo', 'tofu', 'iogurte'].filter(p => proteinas.includes(p)),
			carboidratos: ['aveia', 'pão integral', 'tapioca', 'banana', 'laranja'].filter(c => carboidratos.includes(c) || frutas.includes(c)),
			frutas: frutas,
			oleaginosas: oleaginosas
		},
		'Almoço': {
			proteinas: proteinas,
			vegetais: vegetais,
			carboidratos: carboidratos,
			oleaginosas: ['azeite']
		},
		'Jantar': {
			proteinas: proteinas,
			verduras: verduras,
			carboidratos: carboidratos,
			oleaginosas: ['azeite']
		},
		'Lanches': {
			frutas: frutas,
			oleaginosas: oleaginosas
		}
	};

	function escolherCategoria(categoria, refeicaoNome) {
		if (!categoria) return null;
		const permitidos = alimentosPorRefeicao[refeicaoNome][categoria] || [];
		const disponiveis = permitidos.filter(item => !usados.includes(item));
		if (disponiveis.length === 0) return null;
		const escolhido = escolherAleatorio(disponiveis);
		usados.push(escolhido);
		return escolhido;
	}

	const cafeProteina = escolherCategoria('proteinas', 'Café da Manhã');
	const cafeCarbo = escolherCategoria('carboidratos', 'Café da Manhã');
	const cafeFruta = escolherCategoria('frutas', 'Café da Manhã');
	const cafeOleaginosas = escolherCategoria('oleaginosas', 'Café da Manhã');

	if (cafeProteina || cafeCarbo || cafeFruta || cafeOleaginosas) {
		refeicoes.push({
			refeicao: 'cafe',
			itens: [cafeProteina, cafeCarbo, cafeFruta, cafeOleaginosas].filter(Boolean)
		});
	}

	const almocoProteina = escolherCategoria('proteinas', 'Almoço');
	const almocoVegetal = escolherCategoria('vegetais', 'Almoço');
	const almocoCarbo = escolherCategoria('carboidratos', 'Almoço');
	const almocoAzeite = 'azeite';

	refeicoes.push({
		refeicao: 'almoco',
		itens: [almocoProteina, almocoVegetal, almocoCarbo, almocoAzeite].filter(Boolean)
	});

	const jantarProteina = escolherCategoria('proteinas', 'Jantar');
	const jantarVerdura = escolherCategoria('verduras', 'Jantar');
	const jantarCarbo = escolherCategoria('carboidratos', 'Jantar');
	const jantarAzeite = 'azeite';

	refeicoes.push({
		refeicao: 'jantar',
		itens: [jantarProteina, jantarVerdura, jantarCarbo, jantarAzeite].filter(Boolean)
	});

	const lancheFruta = escolherCategoria('frutas', 'Lanches');
	const lancheOleaginosas = escolherCategoria('oleaginosas', 'Lanches');

	refeicoes.push({
		refeicao: 'lanche',
		itens: [lancheFruta, lancheOleaginosas].filter(Boolean)
	});

	return refeicoes;
}

module.exports = {
	gerarPlanoAlimentar
};
