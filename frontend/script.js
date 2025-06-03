// Dados das dietas
const dietasInfo = {
	mediterranea: {
		titulo: 'Dieta Mediterrânea',
		descricao: 'A dieta mediterrânea é inspirada nos hábitos alimentares dos países banhados pelo Mar Mediterrâneo, conhecida por seus benefícios à saúde cardiovascular.',
		beneficios: [
			'Redução do risco de doenças cardíacas',
			'Controle do colesterol',
			'Aumento da longevidade',
			'Melhora da saúde cerebral'
		],
		alimentos: [
			'Azeite de oliva extra virgem',
			'Peixes e frutos do mar',
			'Grãos integrais',
			'Legumes e verduras',
			'Frutas frescas',
			'Nozes e sementes'
		]
	},
	'low-carb': {
		titulo: 'Dieta Low Carb',
		descricao: 'A dieta low carb é focada na redução de carboidratos, priorizando proteínas e gorduras boas para promover o emagrecimento saudável.',
		beneficios: [
			'Perda de peso mais rápida',
			'Controle do apetite',
			'Estabilização da glicemia',
			'Aumento da energia'
		],
		alimentos: [
			'Carnes magras',
			'Ovos',
			'Vegetais verdes',
			'Abacate',
			'Oleaginosas',
			'Laticínios integrais'
		]
	},
	cetogenica: {
		titulo: 'Dieta Cetogênica',
		descricao: 'A dieta cetogênica é uma versão mais restritiva da low carb, que induz o corpo a um estado de cetose para queima de gordura.',
		beneficios: [
			'Queima acelerada de gordura',
			'Controle do apetite',
			'Estabilização da glicemia',
			'Aumento do foco mental'
		],
		alimentos: [
			'Carnes e peixes',
			'Ovos',
			'Manteiga e óleos saudáveis',
			'Vegetais de baixo carboidrato',
			'Queijos',
			'Abacate e azeite'
		]
	},
	vegetariana: {
		titulo: 'Dieta Vegetariana',
		descricao: 'A dieta vegetariana exclui carnes, mas inclui ovos, laticínios e outros alimentos de origem vegetal, promovendo uma alimentação mais sustentável.',
		beneficios: [
			'Redução do risco de doenças crônicas',
			'Menor impacto ambiental',
			'Maior consumo de fibras',
			'Controle do peso'
		],
		alimentos: [
			'Legumes e verduras',
			'Frutas',
			'Grãos integrais',
			'Leguminosas',
			'Ovos e laticínios',
			'Sementes e oleaginosas'
		]
	}
};

// Elementos do DOM
const menuMobile = document.querySelector('.menu-mobile');
const menu = document.querySelector('.menu');
const modal = document.getElementById('modal');
const modalTitulo = document.getElementById('modal-titulo');
const modalDescricao = document.getElementById('modal-descricao');
const modalBeneficios = document.getElementById('modal-beneficios');
const modalAlimentos = document.getElementById('modal-alimentos');
const fecharModal = document.querySelector('.fechar');
const btnVoltarTopo = document.getElementById('voltar-topo');
const formContato = document.querySelector('.contato-form');

// Menu mobile
menuMobile.addEventListener('click', () => {
	menu.classList.toggle('active');
	const expanded = menu.classList.contains('active');
	menuMobile.setAttribute('aria-expanded', expanded);
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.menu a').forEach(link => {
	link.addEventListener('click', () => {
		menu.classList.remove('active');
		menuMobile.setAttribute('aria-expanded', 'false');
	});
});

// Abrir modal com animação
document.querySelectorAll('.btn-saiba-mais').forEach(btn => {
	btn.addEventListener('click', () => {
		const dietaId = btn.closest('.dieta-card').dataset.dieta;
		const dieta = dietasInfo[dietaId];

		modalTitulo.textContent = dieta.titulo;
		modalDescricao.textContent = dieta.descricao;

		modalBeneficios.innerHTML = dieta.beneficios
			.map(beneficio => `<li>${beneficio}</li>`)
			.join('');

		modalAlimentos.innerHTML = dieta.alimentos
			.map(alimento => `<li>${alimento}</li>`)
			.join('');

		modal.style.display = 'block';
		// Força um reflow para a animação funcionar
		modal.offsetHeight;
		modal.classList.add('active');

		// Foca no modal para acessibilidade
		modal.focus();
	});
});

// Fechar modal com animação
function fecharModalComAnimacao() {
	modal.classList.remove('active');
	setTimeout(() => {
		modal.style.display = 'none';
	}, 300); // Tempo da animação
}

fecharModal.addEventListener('click', fecharModalComAnimacao);

// Fechar modal ao clicar fora
window.addEventListener('click', (e) => {
	if (e.target === modal) {
		fecharModalComAnimacao();
	}
});

// Fechar modal com tecla Escape
document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape' && modal.classList.contains('active')) {
		fecharModalComAnimacao();
	}
});

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();
		const target = document.querySelector(this.getAttribute('href'));
		if (target) {
			target.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		}
	});
});

// Botão voltar ao topo
window.addEventListener('scroll', () => {
	if (window.scrollY > 300) {
		btnVoltarTopo.classList.add('visible');
	} else {
		btnVoltarTopo.classList.remove('visible');
	}
});

btnVoltarTopo.addEventListener('click', () => {
	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	});
});

// Formulário de contato
formContato.addEventListener('submit', (e) => {
	e.preventDefault();

	// Aqui você pode adicionar a lógica para enviar o formulário
	const formData = new FormData(formContato);
	const dados = Object.fromEntries(formData);

	// Exemplo de feedback visual
	const btnSubmit = formContato.querySelector('button[type="submit"]');
	const textoOriginal = btnSubmit.textContent;

	btnSubmit.disabled = true;
	btnSubmit.textContent = 'Enviando...';

	// Simulando envio
	setTimeout(() => {
		alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
		formContato.reset();
		btnSubmit.disabled = false;
		btnSubmit.textContent = textoOriginal;
	}, 1500);
});

// Melhorar acessibilidade do modal
modal.addEventListener('keydown', (e) => {
	if (e.key === 'Tab') {
		const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
		const firstElement = focusableElements[0];
		const lastElement = focusableElements[focusableElements.length - 1];

		if (e.shiftKey) {
			if (document.activeElement === firstElement) {
				lastElement.focus();
				e.preventDefault();
			}
		} else {
			if (document.activeElement === lastElement) {
				firstElement.focus();
				e.preventDefault();
			}
		}
	}
});

// Processamento do formulário de plano alimentar
document.addEventListener('DOMContentLoaded', function () {
	const planoForm = document.getElementById('plano-form');
	const resultadoPlano = document.getElementById('resultado-plano');
	const planoDetalhes = document.getElementById('plano-detalhes');

	if (planoForm) {
		planoForm.addEventListener('submit', function (e) {
			e.preventDefault();

			// Coleta dos dados do formulário
			const formData = new FormData(planoForm);
			const dados = {
				peso: formData.get('peso'),
				altura: formData.get('altura'),
				idade: formData.get('idade'),
				sexo: formData.get('sexo'),
				objetivo: formData.get('objetivo'),
				dieta: formData.get('dieta'),
				proteinas: Array.from(formData.getAll('proteinas')),
				legumes: Array.from(formData.getAll('legumes')),
				verduras: Array.from(formData.getAll('verduras')),
				carboidratos: Array.from(formData.getAll('carboidratos')),
				alergias: Array.from(formData.getAll('alergias'))
			};

			// Cálculo do IMC
			const alturaMetros = dados.altura / 100;
			const imc = dados.peso / (alturaMetros * alturaMetros);

			// Geração do plano alimentar
			const plano = gerarPlanoAlimentar(dados, imc);

			// Exibição do resultado
			exibirPlanoAlimentar(plano);
		});
	}

	// Função para gerar o plano alimentar baseado nos dados do usuário
	function gerarPlanoAlimentar(dados, imc) {
		const plano = {
			titulo: `Plano Alimentar - ${dados.dieta.charAt(0).toUpperCase() + dados.dieta.slice(1)}`,
			imc: imc.toFixed(1),
			classificacaoIMC: classificarIMC(imc),
			caloriasDiarias: calcularCaloriasDiarias(dados),
			refeicoes: gerarRefeicoes(dados),
			recomendacoes: gerarRecomendacoes(dados),
			alimentosEvitar: gerarAlimentosEvitar(dados)
		};

		return plano;
	}

	// Função para classificar o IMC
	function classificarIMC(imc) {
		if (imc < 18.5) return 'Abaixo do peso';
		if (imc < 25) return 'Peso normal';
		if (imc < 30) return 'Sobrepeso';
		if (imc < 35) return 'Obesidade Grau I';
		if (imc < 40) return 'Obesidade Grau II';
		return 'Obesidade Grau III';
	}

	// Função para calcular calorias diárias
	function calcularCaloriasDiarias(dados) {
		// Fator de atividade física (sedentário por padrão)
		let fatorAtividade = 1.2;

		// Cálculo da Taxa Metabólica Basal (TMB) usando a fórmula de Mifflin-St Jeor
		let tmb;
		if (dados.sexo === 'masculino') {
			tmb = (10 * dados.peso) + (6.25 * dados.altura) - (5 * dados.idade) + 5;
		} else {
			tmb = (10 * dados.peso) + (6.25 * dados.altura) - (5 * dados.idade) - 161;
		}

		// Ajuste baseado no objetivo
		let fatorObjetivo = 1;
		switch (dados.objetivo) {
			case 'emagrecimento':
				fatorObjetivo = 0.85; // Déficit calórico
				break;
			case 'hipertrofia':
				fatorObjetivo = 1.15; // Superávit calórico
				break;
			case 'manutencao':
				fatorObjetivo = 1;
				break;
			case 'saude':
				fatorObjetivo = 0.95;
				break;
		}

		return Math.round(tmb * fatorAtividade * fatorObjetivo);
	}

	// Função para gerar as refeições
	function gerarRefeicoes(dados) {
		const refeicoes = {
			cafeDaManha: gerarCafeDaManha(dados),
			lancheManha: gerarLancheManha(dados),
			almoco: gerarAlmoco(dados),
			lancheTarde: gerarLancheTarde(dados),
			jantar: gerarJantar(dados),
			ceia: gerarCeia(dados)
		};

		return refeicoes;
	}

	// Funções auxiliares para gerar cada refeição
	function gerarCafeDaManha(dados) {
		const opcoes = {
			mediterranea: [
				'Iogurte grego com mel e nozes',
				'Pão integral com azeite e tomate',
				'Omelete com legumes'
			],
			'low-carb': [
				'Ovos mexidos com queijo',
				'Iogurte com sementes de chia',
				'Panqueca de proteína'
			],
			cetogenica: [
				'Ovos com bacon',
				'Abacate com queijo',
				'Smoothie de coco com manteiga'
			],
			vegetariana: [
				'Vitamina de frutas com aveia',
				'Tofu mexido com legumes',
				'Pão integral com pasta de grão de bico'
			]
		};

		return opcoes[dados.dieta][Math.floor(Math.random() * opcoes[dados.dieta].length)];
	}

	function gerarLancheManha(dados) {
		const opcoes = {
			mediterranea: [
				'Frutas da estação',
				'Mix de castanhas',
				'Iogurte com granola'
			],
			'low-carb': [
				'Queijo com nozes',
				'Ovo cozido',
				'Abacate com sal'
			],
			cetogenica: [
				'Queijo com azeitonas',
				'Fatias de presunto',
				'Abacate com sal e azeite'
			],
			vegetariana: [
				'Frutas com sementes',
				'Hummus com palitos de legumes',
				'Mix de castanhas'
			]
		};

		return opcoes[dados.dieta][Math.floor(Math.random() * opcoes[dados.dieta].length)];
	}

	function gerarAlmoco(dados) {
		const opcoes = {
			mediterranea: [
				'Salada com grãos integrais, legumes e azeite',
				'Peixe grelhado com legumes',
				'Quinoa com legumes e azeite'
			],
			'low-carb': [
				'Salada com proteína e azeite',
				'Legumes refogados com carne',
				'Omelete com legumes'
			],
			cetogenica: [
				'Carne com legumes',
				'Salada com azeite e queijo',
				'Ovos com bacon e abacate'
			],
			vegetariana: [
				'Legumes com grãos integrais',
				'Salada com tofu',
				'Quinoa com legumes'
			]
		};

		return opcoes[dados.dieta][Math.floor(Math.random() * opcoes[dados.dieta].length)];
	}

	function gerarLancheTarde(dados) {
		return gerarLancheManha(dados); // Reutiliza as opções do lanche da manhã
	}

	function gerarJantar(dados) {
		return gerarAlmoco(dados); // Reutiliza as opções do almoço
	}

	function gerarCeia(dados) {
		const opcoes = {
			mediterranea: [
				'Chá com biscoito integral',
				'Iogurte com frutas',
				'Mix de castanhas'
			],
			'low-carb': [
				'Chá com queijo',
				'Iogurte com sementes',
				'Ovo cozido'
			],
			cetogenica: [
				'Chá com manteiga',
				'Queijo com azeitonas',
				'Abacate com sal'
			],
			vegetariana: [
				'Chá com biscoito integral',
				'Iogurte com frutas',
				'Mix de castanhas'
			]
		};

		return opcoes[dados.dieta][Math.floor(Math.random() * opcoes[dados.dieta].length)];
	}

	// Função para gerar recomendações específicas
	function gerarRecomendacoes(dados) {
		const recomendacoes = [];

		// Recomendações baseadas no objetivo
		switch (dados.objetivo) {
			case 'emagrecimento':
				recomendacoes.push(
					'Mantenha-se hidratado, bebendo água regularmente',
					'Faça refeições a cada 3-4 horas',
					'Priorize alimentos ricos em fibras'
				);
				break;
			case 'hipertrofia':
				recomendacoes.push(
					'Consuma proteínas em todas as refeições',
					'Mantenha um superávit calórico adequado',
					'Faça refeições a cada 2-3 horas'
				);
				break;
			case 'manutencao':
				recomendacoes.push(
					'Mantenha uma alimentação equilibrada',
					'Faça refeições regulares',
					'Mantenha-se ativo fisicamente'
				);
				break;
			case 'saude':
				recomendacoes.push(
					'Priorize alimentos naturais e integrais',
					'Mantenha-se hidratado',
					'Faça refeições em horários regulares'
				);
				break;
		}

		// Recomendações baseadas na dieta
		switch (dados.dieta) {
			case 'mediterranea':
				recomendacoes.push(
					'Use azeite de oliva extra virgem',
					'Inclua peixes regularmente',
					'Consuma grãos integrais'
				);
				break;
			case 'low-carb':
				recomendacoes.push(
					'Reduza o consumo de carboidratos simples',
					'Aumente o consumo de gorduras boas',
					'Mantenha-se hidratado'
				);
				break;
			case 'cetogenica':
				recomendacoes.push(
					'Mantenha os carboidratos muito baixos',
					'Aumente o consumo de gorduras',
					'Monitore seus níveis de cetose'
				);
				break;
			case 'vegetariana':
				recomendacoes.push(
					'Combine diferentes fontes de proteína vegetal',
					'Consuma alimentos ricos em ferro',
					'Inclua fontes de vitamina B12'
				);
				break;
		}

		return recomendacoes;
	}

	// Função para gerar lista de alimentos a evitar
	function gerarAlimentosEvitar(dados) {
		const alimentosEvitar = [];

		// Alimentos a evitar baseados na dieta
		switch (dados.dieta) {
			case 'mediterranea':
				alimentosEvitar.push(
					'Alimentos processados',
					'Açúcares refinados',
					'Carnes vermelhas em excesso'
				);
				break;
			case 'low-carb':
				alimentosEvitar.push(
					'Açúcares e doces',
					'Pães e massas refinadas',
					'Arroz branco'
				);
				break;
			case 'cetogenica':
				alimentosEvitar.push(
					'Todos os carboidratos simples',
					'Açúcares',
					'Grãos e cereais'
				);
				break;
			case 'vegetariana':
				alimentosEvitar.push(
					'Carnes e derivados',
					'Alimentos processados',
					'Açúcares refinados'
				);
				break;
		}

		// Adiciona alimentos baseados nas alergias
		if (dados.alergias.includes('lactose')) {
			alimentosEvitar.push('Leite e derivados com lactose');
		}
		if (dados.alergias.includes('gluten')) {
			alimentosEvitar.push('Alimentos com glúten');
		}
		if (dados.alergias.includes('leite')) {
			alimentosEvitar.push('Todos os derivados do leite');
		}
		if (dados.alergias.includes('ovo')) {
			alimentosEvitar.push('Ovos e alimentos que contenham ovos');
		}
		if (dados.alergias.includes('frutos_mar')) {
			alimentosEvitar.push('Frutos do mar');
		}

		return alimentosEvitar;
	}

	// Função para exibir o plano alimentar
	function exibirPlanoAlimentar(plano) {
		const html = `
            <div class="plano-header">
                <h4>${plano.titulo}</h4>
                <p>IMC: ${plano.imc} - ${plano.classificacaoIMC}</p>
                <p>Calorias Diárias Recomendadas: ${plano.caloriasDiarias} kcal</p>
            </div>

            <div class="plano-refeicoes">
                <h4>Plano de Refeições</h4>
                <ul>
                    <li><strong>Café da Manhã:</strong> ${plano.refeicoes.cafeDaManha}</li>
                    <li><strong>Lanche da Manhã:</strong> ${plano.refeicoes.lancheManha}</li>
                    <li><strong>Almoço:</strong> ${plano.refeicoes.almoco}</li>
                    <li><strong>Lanche da Tarde:</strong> ${plano.refeicoes.lancheTarde}</li>
                    <li><strong>Jantar:</strong> ${plano.refeicoes.jantar}</li>
                    <li><strong>Ceia:</strong> ${plano.refeicoes.ceia}</li>
                </ul>
            </div>

            <div class="plano-recomendacoes">
                <h4>Recomendações</h4>
                <ul>
                    ${plano.recomendacoes.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            </div>

            <div class="plano-alimentos-evitar">
                <h4>Alimentos a Evitar</h4>
                <ul>
                    ${plano.alimentosEvitar.map(alimento => `<li>${alimento}</li>`).join('')}
                </ul>
            </div>
        `;

		planoDetalhes.innerHTML = html;
		resultadoPlano.hidden = false;
		resultadoPlano.scrollIntoView({ behavior: 'smooth' });
	}
}); 