import { useEffect, useState } from 'react';
import Header from "../components/Header";
import "../styles/FazerDieta.css";
import { fetchWithRefresh } from '../utils/fetchWithRefresh'
import { useNavigate } from 'react-router-dom';

const proteinasOptions = [
	'peixe', 'frango', 'ovo', 'tofu', 'atum', 'camarão',
	'carne bovina', 'grão de bico', 'feijão', 'lentilha', 'queijo'
];

const vegetaisOptions = [
	'brócolis', 'berinjela', 'tomate', 'pimentão', 'abobrinha', 'cenoura', 'couve-flor'
];

const verdurasOptions = ['alface', 'rúcula', 'espinafre', 'couve', 'agrião'];

const carboidratosOptions = ['arroz integral', 'batata doce', 'quinoa', 'macarrão', 'batata'];

const frutasOptions = ['laranja', 'mamão', 'morango', 'banana', 'abacate', 'maçã', 'uva', 'manga'];

const oleaginosasOptions = ['azeite', 'castanhas', 'nozes', 'amêndoas'];

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
		oleaginosas: [],
		alergias: [],
		outrasAlergias: ''
	});

	const navigate = useNavigate();

	useEffect(() => {
		const verificarPlano = async () => {
			try {
				const token = localStorage.getItem('accessToken');
				const response = await fetchWithRefresh('http://localhost:3000/api/plano', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					}
				});

				if (response.ok) {
					const plano = await response.json();
					if (plano) {
						navigate('/dieta');
					}
				}
			} catch (error) {
				console.error('Erro ao verificar plano:', error);
			}
		};

		verificarPlano();
	}, [navigate]);

	const handleInputChange = (e) => {
		const { name, value, type, checked } = e.target;

		if (type === 'checkbox') {
			setFormData(prev => ({
				...prev,
				[name]: checked
					? [...prev[name], value]
					: prev[name].filter(item => item !== value)
			}));
		} else {
			setFormData(prev => ({ ...prev, [name]: value }));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const dataToSend = {
			peso: Number(formData.peso),
			altura: Number(formData.altura),
			idade: Number(formData.idade),
			sexo: formData.sexo,
			dieta: formData.dieta,
			objetivo: formData.objetivo,
			proteinas: formData.proteinas,
			vegetais: formData.vegetais,
			verduras: formData.verduras,
			carboidratos: formData.carboidratos,
			frutas: formData.frutas,
			oleaginosas: formData.oleaginosas,
			alergias: formData.alergias,
			outrasAlergias: formData.outrasAlergias
		};

		try {
			const token = localStorage.getItem('accessToken');
			const response = await fetchWithRefresh('http://localhost:3000/api/plano', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				},
				body: JSON.stringify(dataToSend)
			});

			if (!response.ok) throw new Error('Erro ao enviar plano alimentar');

			const result = await response.json();
			navigate("/dieta")
			console.log('Plano recebido do backend:', result);
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
					<img
						src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=60"
						alt="Variedade de alimentos saudáveis"
						className="dietas-img"
					/>
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
							<div className="food-category-card">
								<div className="card-header">
									<span>🍗</span>
									<h4>Proteínas</h4>
								</div>
								<div className="card-content">
									{renderCheckboxes('proteinas', proteinasOptions)}
								</div>
							</div>

							<div className="food-category-card">
								<div className="card-header">
									<span>🥕</span>
									<h4>Vegetais</h4>
								</div>
								<div className="card-content">
									{renderCheckboxes('vegetais', vegetaisOptions)}
								</div>
							</div>

							<div className="food-category-card">
								<div className="card-header">
									<span>🌿</span>
									<h4>Verduras</h4>
								</div>
								<div className="card-content">
									{renderCheckboxes('verduras', verdurasOptions)}
								</div>
							</div>

							<div className="food-category-card">
								<div className="card-header">
									<span>🍞</span>
									<h4>Carboidratos</h4>
								</div>
								<div className="card-content">
									{renderCheckboxes('carboidratos', carboidratosOptions)}
								</div>
							</div>

							<div className="food-category-card">
								<div className="card-header">
									<span>🍎</span>
									<h4>Frutas</h4>
								</div>
								<div className="card-content">
									{renderCheckboxes('frutas', frutasOptions)}
								</div>
							</div>

							<div className="food-category-card">
								<div className="card-header">
									<span>🥜</span>
									<h4>Oleaginosas</h4>
								</div>
								<div className="card-content">
									{renderCheckboxes('oleaginosas', oleaginosasOptions)}
								</div>
							</div>
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
									{renderCheckboxes('alergias', ['lactose', 'gluten', 'leite', 'ovo', 'frutos_do_mar', 'amendoim', 'soja', 'nenhuma'])}
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
