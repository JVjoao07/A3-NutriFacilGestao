import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dieta.css";
import Header from "../components/Header";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
	ResponsiveContainer,
} from "recharts";

// Função para obter ID do usuário a partir do token JWT
const getUserIdFromToken = (token) => {
	try {
		const payload = JSON.parse(atob(token.split(".")[1])); // Decodifica o payload do JWT
		return payload.id; // Retorna o ID do usuário
	} catch (error) {
		console.error("Erro ao obter ID do usuário:", error);
		return null;
	}
};

const refeicaoInfo = {
	cafe: { icone: "☕", horario: "07:00" },
	almoco: { icone: "🍽️", horario: "12:30" },
	jantar: { icone: "🌙", horario: "19:30" },
	lanche: { icone: "🍎", horario: "16:00" },
};

const iconesAlimentos = {
	// Proteínas
	peixe: "🐟",
	frango: "🍗",
	ovo: "🥚",
	tofu: "🍱",
	atum: "🐠",
	camarão: "🍤",
	"carne bovina": "🥩",
	"grão de bico": "🥫",
	feijão: "🥫",
	lentilha: "🥫",
	queijo: "🧀",

	// Vegetais
	brócolis: "🥦",
	berinjela: "🍆",
	tomate: "🍅",
	pimentão: "🌶️",
	abobrinha: "🥒",
	cenoura: "🥕",
	couveflor: "🥬", // substituição

	// Verduras
	alface: "🥬",
	rúcula: "🥬",
	espinafre: "🥬",
	couve: "🥬",
	agrião: "🌿",

	// Carboidratos
	"arroz integral": "🍚",
	"batata doce": "🍠",
	quinoa: "🥣",
	macarrão: "🍝",
	batata: "🥔",

	// Frutas
	laranja: "🍊",
	mamão: "🥭",
	morango: "🍓",
	banana: "🍌",
	abacate: "🥑",
	maçã: "🍎",
	uva: "🍇",
	manga: "🥭",

	// Oleaginosas e azeites
	azeite: "🫒",
	castanhas: "🥜",
	nozes: "🌰",
	amêndoas: "🥜",

	// Padrão
	default: "🍽️",
};

// Função para abrir busca no Google com ingredientes da refeição
function buscarReceitasNoGoogle(itens, refeicao) {
	const ingredientesFormatados = itens.join(", ");
	const query = encodeURIComponent(`receita ${refeicao} com ${ingredientesFormatados}`);
	const url = `https://www.google.com/search?q=${query}`;
	window.open(url, "_blank");
}

function Dieta() {
	const [planoAlimentar, setPlanoAlimentar] = useState(null);
	const [loading, setLoading] = useState(true);
	const [usuario, setUsuario] = useState(null);
	const [opcoesAtuais, setOpcoesAtuais] = useState({}); // <-- Estado para controlar a opção exibida
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUsuario = async () => {
			try {
				const token = localStorage.getItem("accessToken");
				if (!token) throw new Error("Token não encontrado");

				const userId = getUserIdFromToken(token);
				if (!userId) throw new Error("ID do usuário não encontrado no token");

				const response = await fetch(`http://localhost:3000/api/user/${userId}`, {
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				});

				if (!response.ok) {
					throw new Error(`Erro ao buscar usuário: ${response.status}`);
				}

				const data = await response.json();
				setUsuario(data);
			} catch (error) {
				console.error("Erro ao buscar usuário:", error);
				setUsuario(null);
			}
		};

		fetchUsuario();
	}, []);

	useEffect(() => {
		const fetchPlanoAlimentar = async () => {
			if (usuario?.statusPagamento === "pago") {
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

					// Inicializa o estado de opções para cada refeição na opção 0
					const opcoesIniciais = {};
					data.refeicoes.forEach(({ refeicao }) => {
						opcoesIniciais[refeicao] = 0;
					});
					setOpcoesAtuais(opcoesIniciais);

				} catch (error) {
					console.error("Erro ao buscar plano alimentar:", error);
					setPlanoAlimentar(null);
					navigate("/fazer-dieta");
				} finally {
					setLoading(false);
				}
			} else {
				setLoading(false);
			}
		};

		if (usuario) {
			fetchPlanoAlimentar();
		}
	}, [usuario, navigate]);

	const consumoAguaMl = Number(planoAlimentar?.consumoAguaDiario) || 0;

	const dadosAgua = [
		{ dia: "Seg", consumo: consumoAguaMl },
		{ dia: "Ter", consumo: consumoAguaMl },
		{ dia: "Qua", consumo: consumoAguaMl },
		{ dia: "Qui", consumo: consumoAguaMl },
		{ dia: "Sex", consumo: consumoAguaMl },
		{ dia: "Sáb", consumo: consumoAguaMl },
		{ dia: "Dom", consumo: consumoAguaMl },
	];

	if (loading) {
		return <p className="dieta-container">Carregando...</p>;
	}

	const deletarPlano = async () => {
		const confirmar = window.confirm("Tem certeza que deseja deletar seu plano alimentar?");
		if (!confirmar) return;

		try {
			const token = localStorage.getItem("accessToken");
			const response = await fetch("http://localhost:3000/api/plano", {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				throw new Error(`Erro: ${response.status}`);
			}

			alert("Plano alimentar deletado com sucesso!");
			setPlanoAlimentar(null);
			navigate("/fazer-dieta");
		} catch (error) {
			console.error("Erro ao deletar plano alimentar:", error);
			alert("Ocorreu um erro ao tentar deletar o plano.");
		}
	};

	// Função para alternar opção da refeição
	const alternarOpcao = (refeicao) => {
		setOpcoesAtuais((prev) => ({
			...prev,
			[refeicao]: prev[refeicao] === 0 ? 1 : 0,
		}));
	};

	return (
		<>
			<Header />
			<div className="dieta-container">
				{usuario?.statusPagamento === "pago" ? (
					planoAlimentar ? (
						<div className="dieta-card">
							<h2 className="dieta-title">Sua Dieta {planoAlimentar.dieta}</h2>
							<div className="dieta-summary">
								<p>
									<strong>IMC:</strong> {planoAlimentar.imc} ({planoAlimentar.classificacaoImc})
								</p>
								<p>
									<strong>TMB:</strong> {planoAlimentar.tmb} kcal
								</p>
								<p>
									<strong>Calorias Diárias:</strong> {planoAlimentar.caloriasDiarias} kcal
								</p>
								<p>
									<strong>Consumo de água diário:</strong> {planoAlimentar.consumoAguaDiario} ml
								</p>
							</div>

							<h3 className="dieta-subtitle">Consumo de Água Diário (ml)</h3>
							<ResponsiveContainer width="100%" height={200}>
								<LineChart
									data={dadosAgua}
									margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
								>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="dia" />
									<YAxis />
									<Tooltip />
									<Line type="monotone" dataKey="consumo" stroke="#0077b6" strokeWidth={3} />
								</LineChart>
							</ResponsiveContainer>

							<h3 className="dieta-subtitle">Refeições</h3>
							<div className="refeicoes-container">
								{planoAlimentar.refeicoes.map(({ refeicao, nome, descricao, itens, calorias }, i) => {
									const info = refeicaoInfo[refeicao] || {};
									const opcaoAtual = opcoesAtuais[refeicao] || 0;
									const itensParaMostrar = itens[opcaoAtual] || [];

									return (
										<div key={i} className="refeicao-card">
											<h4 className="refeicao-title">
												<div>
													<span className="icone-refeicao" aria-label={refeicao}>
														{info.icone}
													</span>{" "}
													{refeicao.charAt(0).toUpperCase() + refeicao.slice(1)}
													{nome && ` - ${nome}`}
													{info.horario && (
														<span className="horario-refeicao"> ({info.horario})</span>
													)}
												</div>
												<div>
													{/* Botão para alternar opção */}
													{itens.length > 1 && (
														<button
															className="btn-alternar-opcao"
															onClick={() => alternarOpcao(refeicao)}
															style={{
																marginLeft: "10px",
																padding: "3px 8px",
																fontSize: "0.8rem",
																cursor: "pointer",
															}}
															aria-label={`Alternar opção da refeição ${refeicao}`}
														>
															Opção {opcaoAtual + 1}
														</button>
													)}
												</div>

											</h4>
											{descricao && <p className="refeicao-desc">{descricao}</p>}

											<ul className="refeicao-itens">
												{itensParaMostrar.map((item, idx) => {
													const icone = iconesAlimentos[item.toLowerCase()] || iconesAlimentos.default;
													return (
														<li key={idx}>
															{icone} {item}
														</li>
													);
												})}
											</ul>

											<button
												className="btn-procurar-receita"
												onClick={() => buscarReceitasNoGoogle(itensParaMostrar, refeicao)}
											>
												Procurar Receita
											</button>

											{calorias && (
												<p className="refeicao-calorias">Calorias: {calorias} kcal</p>
											)}
										</div>
									);
								})}
							</div>

							<h3 className="dieta-subtitle">Recomendações</h3>
							<ul className="dieta-list recomendacoes">
								{planoAlimentar.recomendacoes.map((rec, idx) => (
									<li key={idx}>⚠️ {rec}</li>
								))}
							</ul>

							<h3 className="dieta-subtitle">Alimentos a evitar</h3>
							{planoAlimentar.alimentosAEvitar.length > 0 ? (
								<ul className="dieta-list alimentos-a-evitar">
									{planoAlimentar.alimentosAEvitar.map((alimento, idx) => (
										<li key={idx}>🚫 {alimento}</li>
									))}
								</ul>
							) : (
								<p>Sem alimentos a evitar.</p>
							)}

							<button className="dieta-button deletar-plano" onClick={deletarPlano}>
								🗑️ Deletar Plano Alimentar
							</button>
						</div>
					) : (
						<p>Você não possui um plano alimentar cadastrado.</p>
					)
				) : (
					<div className="dieta-card">
						<h2 className="dieta-title">Pagamento pendente</h2>
						<p>Para acessar seu plano alimentar, é necessário concluir o pagamento.</p>
						<button onClick={() => navigate("/pagamento")} className="dieta-button">
							Realizar Pagamento
						</button>
					</div>
				)}
			</div>
		</>
	);
}

export default Dieta;
