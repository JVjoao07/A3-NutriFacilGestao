import React from 'react';

function Sobre() {
	return (
		<section id="sobre" className="sobre" aria-label="Sobre nós">
			<div className="container">
				<h2>Sobre o NutriFácil</h2>
				<div className="sobre-content">
					<div className="sobre-texto">
						<div className="sobre-image">
							<img
								src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&auto=format&fit=crop&q=60"
								alt="Nutricionista preparando refeição saudável"
								className="sobre-img"
							/>
						</div>
						<p>
							O NutriFácil nasceu da necessidade de tornar a alimentação saudável mais acessível e prática
							para todos. Nossa missão é ajudar pessoas a alcançarem seus objetivos de saúde através de
							planos alimentares personalizados e sustentáveis.
						</p>
						<p>
							Nossa equipe é composta por nutricionistas experientes e apaixonados por saúde e bem-estar,
							prontos para guiar você em sua jornada rumo a uma vida mais saudável.
						</p>
					</div>
					<div className="sobre-valores">
						<h3>Nossos Valores</h3>
						<ul>
							<li>Compromisso com a saúde</li>
							<li>Personalização dos planos</li>
							<li>Base científica</li>
							<li>Sustentabilidade</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Sobre;
