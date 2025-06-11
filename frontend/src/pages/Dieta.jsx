import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dieta.css";
import Header from "../components/Header";

function Dieta() {
	const [planoAlimentar, setPlanoAlimentar] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchPlanoAlimentar = async () => {
			try {
				const token = localStorage.getItem("accessToken");
				const response = await fetch("http://localhost:3000/api/plano", {
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				});

				if (!response.ok) {
					throw new Error(`Erro: ${response.status}`);
				}

				const data = await response.json();
				setPlanoAlimentar(data);
			} catch (error) {
				console.error("Erro ao buscar plano alimentar:", error);
				setPlanoAlimentar(null);
			} finally {
				setLoading(false);
			}
		};

		fetchPlanoAlimentar();
	}, []);

	const handleCriarDieta = () => {
		navigate("/fazer-dieta");
	};

	if (loading) {
		return <p className="dieta-container">Carregando...</p>;
	}

	return (
		<>
			<Header />
			<div className="dieta-container">
				{planoAlimentar ? (
					<div className="dieta-card">
						<h2 className="dieta-title">Sua Dieta</h2>
						<div className="dieta-info">
							<p><strong>Dieta:</strong> {planoAlimentar.dieta}</p>
							<p><strong>IMC:</strong> {planoAlimentar.imc} ({planoAlimentar.classificacaoImc})</p>
							<p><strong>TMB:</strong> {planoAlimentar.tmb} kcal</p>
							<p><strong>Calorias Diárias:</strong> {planoAlimentar.caloriasDiarias} kcal</p>
							<p><strong>Consumo de água diário:</strong> {planoAlimentar.consumoAguaDiario}</p>
						</div>

						<h3 className="dieta-subtitle">Refeições</h3>
						<ul className="dieta-list">
							{planoAlimentar.refeicoes.map(({ refeicao, itens }, index) => (
								<li key={index}>
									<strong>{refeicao.charAt(0).toUpperCase() + refeicao.slice(1)}:</strong> {itens.join(", ")}
								</li>
							))}
						</ul>

						<h3 className="dieta-subtitle">Recomendações</h3>
						<ul className="dieta-list">
							{planoAlimentar.recomendacoes.map((rec, index) => (
								<li key={index}>{rec}</li>
							))}
						</ul>

						<h3 className="dieta-subtitle">Alimentos a evitar</h3>
						<ul className="dieta-list">
							{planoAlimentar.alimentosAEvitar.map((alimento, index) => (
								<li key={index}>{alimento}</li>
							))}
						</ul>
					</div>
				) : (
					<div className="dieta-card">
						<h2 className="dieta-title">Nenhuma dieta encontrada</h2>
						<p>Você ainda não possui uma dieta cadastrada.</p>
						<button onClick={handleCriarDieta} className="dieta-button">
							Fazer Minha Dieta
						</button>
					</div>
				)}
			</div>
		</>
	);
}

export default Dieta;