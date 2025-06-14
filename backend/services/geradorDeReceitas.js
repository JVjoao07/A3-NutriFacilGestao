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

	const filtrar = (lista, categoria) => lista.filter(item => permitidos[categoria].includes(item));

	const proteinasFiltradas = filtrar(proteinas, 'proteinas');
	const vegetaisFiltrados = filtrar(vegetais, 'vegetais');
	const verdurasFiltradas = filtrar(verduras, 'verduras');
	const carboidratosFiltrados = filtrar(carboidratos, 'carboidratos');
	const frutasFiltradas = filtrar(frutas, 'frutas');
	const oleaginosasFiltradas = filtrar(oleaginosas, 'oleaginosas');

	let caloriasDiarias = tmb;
	if (objetivo === 'emagrecimento') caloriasDiarias -= 500;
	else if (objetivo === 'hipertrofia') caloriasDiarias += 500;
	caloriasDiarias = Math.round(caloriasDiarias);

	const consumoAguaDiario = Math.round(peso * 35);

	const refeicoes = gerarRefeicoes({
		proteinas: proteinasFiltradas,
		vegetais: vegetaisFiltrados,
		verduras: verdurasFiltradas,
		carboidratos: carboidratosFiltrados,
		frutas: frutasFiltradas,
		oleaginosas: oleaginosasFiltradas
	});

	const recomendacoes = [];

	switch (objetivo) {
		case 'emagrecimento':
			recomendacoes.push('Manter um déficit calórico moderado e evitar alimentos ultraprocessados.');
			break;
		case 'hipertrofia':
			recomendacoes.push('Priorizar a ingestão adequada de proteínas e manter um superávit calórico.');
			break;
		case 'manutencao':
			recomendacoes.push('Manter uma dieta equilibrada, focando em qualidade nutricional.');
			break;
		case 'saude':
			recomendacoes.push('Priorizar alimentos naturais e reduzir o consumo de açúcares e gorduras saturadas.');
			break;
	}

	if (imc < 18.5) {
		recomendacoes.push('Ganhar peso de forma saudável, priorizando proteínas e carboidratos complexos.');
	} else if (imc >= 25) {
		recomendacoes.push('Reduzir a ingestão calórica e aumentar a prática de atividades físicas.');
	}

	const alimentosAEvitar = [...alergias];
	if (outrasAlergias) alimentosAEvitar.push(outrasAlergias);

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

	// CAFÉ DA MANHÃ: garantir proteína e carboidrato, frutas e oleaginosas opcionais
	let cafeProteina = escolherCategoria('proteinas', 'Café da Manhã');
	let cafeCarbo = escolherCategoria('carboidratos', 'Café da Manhã');
	// Se faltar proteína ou carboidrato, tentar pegar de frutas ou proteínas adicionais
	if (!cafeProteina && proteinas.length > 0) cafeProteina = escolherAleatorio(proteinas.filter(p => !usados.includes(p)));
	if (!cafeCarbo) {
		const carboAlternativo = frutas.find(f => !usados.includes(f) && (alimentosPorRefeicao['Café da Manhã'].carboidratos.includes(f)));
		if (carboAlternativo) {
			cafeCarbo = carboAlternativo;
			usados.push(cafeCarbo);
		}
	}

	const cafeFruta = escolherCategoria('frutas', 'Café da Manhã');
	const cafeOleaginosas = escolherCategoria('oleaginosas', 'Café da Manhã');

	if (cafeProteina || cafeCarbo || cafeFruta || cafeOleaginosas) {
		refeicoes.push({
			refeicao: 'cafe',
			itens: [cafeProteina, cafeCarbo, cafeFruta, cafeOleaginosas].filter(Boolean)
		});
	}

	// ALMOÇO: proteína, vegetais, carboidrato e azeite (oleaginosas)
	let almocoProteina = escolherCategoria('proteinas', 'Almoço');
	let almocoVegetal = escolherCategoria('vegetais', 'Almoço');
	let almocoCarbo = escolherCategoria('carboidratos', 'Almoço');
	let almocoAzeite = 'azeite'; // sempre incluir azeite no almoço

	refeicoes.push({
		refeicao: 'almoco',
		itens: [almocoProteina, almocoVegetal, almocoCarbo, almocoAzeite].filter(Boolean)
	});

	// JANTAR: proteína, verduras, carboidrato, azeite
	let jantarProteina = escolherCategoria('proteinas', 'Jantar');
	let jantarVerdura = escolherCategoria('verduras', 'Jantar');
	let jantarCarbo = escolherCategoria('carboidratos', 'Jantar');
	let jantarAzeite = 'azeite'; // sempre incluir azeite no jantar

	refeicoes.push({
		refeicao: 'jantar',
		itens: [jantarProteina, jantarVerdura, jantarCarbo, jantarAzeite].filter(Boolean)
	});

	// LANCHE: frutas e oleaginosas
	let lancheFruta = escolherCategoria('frutas', 'Lanches');
	let lancheOleaginosas = escolherCategoria('oleaginosas', 'Lanches');

	refeicoes.push({
		refeicao: 'lanche',
		itens: [lancheFruta, lancheOleaginosas].filter(Boolean)
	});

	return refeicoes;
}

module.exports = {
	gerarPlanoAlimentar
};
