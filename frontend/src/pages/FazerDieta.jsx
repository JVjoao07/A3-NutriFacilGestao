import { useState } from 'react';
import Header from "../components/Header";
import "../styles/FazerDieta.css";

function FazerDieta() {
	const [formData, setFormData] = useState({
		peso: '',
		altura: '',
		idade: '',
		sexo: '',
		objetivo: '',
		dieta: '',
		proteinas: [],
		vegetais: [],
		verduras: [],
		carboidratos: [],
		frutas: [],
		alergias: [],
		outrasAlergias: ''
	});

	const handleInputChange = (e) => {
		const { name, value, type, checked } = e.target;

		if (type === 'checkbox') {
			setFormData(prev => ({
				...prev,
				[name]: checked
					? [...prev[name], value]
					: prev[name].filter(item => item !== value)
			}));
		} else if (type === 'radio') {
			setFormData(prev => ({ ...prev, [name]: value }));
		} else {
			setFormData(prev => ({ ...prev, [name]: value }));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const { peso, altura, idade, sexo, dieta, objetivo, alergias = [], outrasAlergias = '' } = formData;

		// Cálculo de IMC
		const alturaM = altura / 100;
		const imc = (peso / (alturaM ** 2)).toFixed(2);

		let classificacaoImc = '';
		if (imc < 18.5) classificacaoImc = 'Abaixo do peso';
		else if (imc < 25) classificacaoImc = 'Peso normal';
		else if (imc < 30) classificacaoImc = 'Sobrepeso';
		else classificacaoImc = 'Obesidade';

		// Cálculo de TMB (Mifflin-St Jeor)
		let tmb = 10 * peso + 6.25 * altura - 5 * idade;
		tmb += (sexo === 'masculino') ? 5 : -161;

		// Ajuste de calorias conforme objetivo
		let caloriasDiarias = tmb;
		if (objetivo === 'emagrecimento') caloriasDiarias -= 500;
		else if (objetivo === 'hipertrofia') caloriasDiarias += 500;

		caloriasDiarias = Math.round(caloriasDiarias);

		// Consumo de água (35 ml por kg)
		const consumoAguaDiario = Math.round(peso * 35);

		// Refeições (modelo simplificado)
		const refeicoes = [
			'Café da manhã: proteínas, carboidratos, frutas',
			'Almoço: proteínas, vegetais, carboidratos',
			'Jantar: proteínas, vegetais',
			'Lanches: frutas, oleaginosas'
		];

		// Recomendacoes detalhadas
		const recomendacoes = [];

		// Recomendacoes baseadas no objetivo
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

		// Recomendacoes baseadas no IMC
		if (imc < 18.5) {
			recomendacoes.push('Ganhar peso de forma saudável, priorizando proteínas e carboidratos complexos.');
		} else if (imc >= 25) {
			recomendacoes.push('Reduzir a ingestão calórica e aumentar a prática de atividades físicas.');
		}

		// Alimentos a evitar
		const alimentosAEvitar = [...alergias];
		if (outrasAlergias) alimentosAEvitar.push(outrasAlergias);

		// Modelo para enviar
		const planoAlimentar = {
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

		console.log('Plano gerado:', planoAlimentar);

		// Envio para o backend usando fetch
		try {
			const token = localStorage.getItem('accessToken');
			const response = await fetch('http://localhost:3000/api/planos', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				},
				body: JSON.stringify(planoAlimentar)
			});

			if (!response.ok) {
				throw new Error('Erro ao enviar plano alimentar');
			}

			const data = await response.json();
			console.log('Plano enviado com sucesso:', data);
		} catch (error) {
			console.error('Erro no envio:', error);
		}
	};


	const renderCheckboxes = (category, options) => (
		options.map(opt => (
			<label key={opt} className="checkbox-label">
				<input
					type="checkbox"
					name={category}
					value={opt}
					checked={formData[category].includes(opt)}
					onChange={handleInputChange}
				/>
				<span>{opt[0].toUpperCase() + opt.slice(1).replace('-', ' ')}</span>
			</label>
		))
	);

	return (
		<>
			<Header />
			<section id="dietas" className="dietas" aria-label="Plano alimentar personalizado">
				<h2>Seu Plano Alimentar Personalizado</h2>

				<div className="dietas-intro">
					<img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=60"
						alt="Variedade de alimentos saudáveis" className="dietas-img" />
					<p>Personalize seu plano alimentar de acordo com suas preferências e necessidades</p>
				</div>

				<form onSubmit={handleSubmit} className="plano-form" aria-label="Formulário de plano alimentar">

					{/* Informações Pessoais */}
					<div className="form-section">
						<h3>Informações Pessoais</h3>
						<div className="form-group">
							<label>Peso (kg):</label>
							<input type="number" name="peso" min="30" max="300" step="0.1"
								value={formData.peso} onChange={handleInputChange} required />
						</div>
						<div className="form-group">
							<label>Altura (cm):</label>
							<input type="number" name="altura" min="100" max="250"
								value={formData.altura} onChange={handleInputChange} required />
						</div>
						<div className="form-group">
							<label>Idade (anos):</label>
							<input type="number" name="idade" min="12" max="120"
								value={formData.idade} onChange={handleInputChange} required />
						</div>
						<div className="form-group">
							<label>Sexo:</label>
							<div className="radio-group">
								<label>
									<input type="radio" name="sexo" value="masculino"
										checked={formData.sexo === 'masculino'}
										onChange={handleInputChange} />
									Masculino
								</label>
								<label>
									<input type="radio" name="sexo" value="feminino"
										checked={formData.sexo === 'feminino'}
										onChange={handleInputChange} />
									Feminino
								</label>
							</div>
						</div>
					</div>

					{/* Objetivos e Preferências */}
					<div className="form-section">
						<h3>Objetivos e Preferências</h3>
						<div className="form-group">
							<label>Objetivo Principal:</label>
							<select name="objetivo" value={formData.objetivo} onChange={handleInputChange} required>
								<option value="">Selecione seu objetivo</option>
								<option value="emagrecimento">Emagrecimento</option>
								<option value="hipertrofia">Hipertrofia</option>
								<option value="manutencao">Manutenção do Peso</option>
								<option value="saude">Melhoria da Saúde</option>
							</select>
						</div>
						<div className="form-group">
							<label>Tipo de Dieta:</label>
							<select name="dieta" value={formData.dieta} onChange={handleInputChange} required>
								<option value="">Selecione a dieta</option>
								<option value="mediterranea">Mediterrânea</option>
								<option value="low-carb">Low Carb</option>
								<option value="cetogenica">Cetogênica</option>
								<option value="vegetariana">Vegetariana</option>
							</select>
						</div>
					</div>

					{/* Preferências Alimentares */}
					<div className="form-section">
						<h3>Preferências Alimentares</h3>
						<p>Selecione seus alimentos preferidos em cada categoria</p>

						<div className="food-preferences-grid">
							{[
								{ name: 'proteinas', icon: '🍗', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400', options: ['frango', 'peixe', 'carne-vermelha', 'ovos', 'tofu'] },
								{ name: 'vegetais', icon: '🥕', img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400', options: ['cenoura', 'brocolis', 'abobrinha', 'berinjela', 'pimentao'] },
								{ name: 'verduras', icon: '🌿', img: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400', options: ['alface', 'espinafre', 'rucula', 'couve', 'agriao'] },
								{ name: 'carboidratos', icon: '🍞', img: 'https://i0.wp.com/manipulacao.drogasil.com.br/wp-content/uploads/2024/07/alimentos-ricos-em-carboidrato.jpeg?fit=5824%2C3264&ssl=1', options: ['arroz', 'batata', 'macarrao', 'quinoa', 'batata-doce'] },
								{ name: 'frutas', icon: '🍎', img: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400', options: ['maca', 'banana', 'laranja', 'morango', 'uva', 'manga'] }
							].map(cat => (
								<div key={cat.name} className="food-category-card">
									<div className="card-header">
										<span>{cat.icon}</span>
										<h4>{cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}</h4>
									</div>
									<div className="card-content">
										<img src={cat.img} alt={cat.name} className="category-img" />
										{renderCheckboxes(cat.name, cat.options)}
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Alergias */}
					<div className="form-section">
						<h3>Alergias e Intolerâncias</h3>
						<p>Selecione quaisquer alergias ou intolerâncias alimentares</p>
						<div className="food-preferences-grid">
							<div className="food-category-card">
								<div className="card-header">
									<span>⚠️</span>
									<h4>Alergias</h4>
								</div>
								<div className="card-content">
									{renderCheckboxes('alergias', ['lactose', 'gluten', 'leite', 'ovo', 'frutos_mar', 'amendoim', 'soja', 'nenhuma'])}
									<div className="form-group outras-alergias">
										<label>Outras Alergias ou Intolerâncias:</label>
										<input
											type="text"
											name="outrasAlergias"
											value={formData.outrasAlergias}
											onChange={handleInputChange}
											placeholder="Digite outras alergias ou intolerâncias"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>

					<button type="submit" className="btn btn-primary">Gerar Plano Alimentar</button>
				</form>
			</section>
		</>
	);
}

export default FazerDieta;
