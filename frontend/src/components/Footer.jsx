import React from 'react';

function Footer() {
	const voltarAoTopo = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<footer>
			<div className="container">
				<p>&copy; 2024 NutriFácil. Todos os direitos reservados.</p>
				<button
					id="voltar-topo"
					className="btn-voltar-topo"
					aria-label="Voltar ao topo"
					onClick={voltarAoTopo}
				>
					↑
				</button>
			</div>
		</footer>
	);
}

export default Footer;
