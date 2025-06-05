import React from 'react';

function Hero() {
	return (
		<section id="inicio" className='hero' aria-label="Introdução">
			<div className="hero-overlay"></div>
			<div className="hero-content">
				<h1>Transforme sua vida com NutriFácil</h1>
				<p>Descubra o plano alimentar perfeito para você</p>
				<a href="/fazer-dieta" className="btn">Faça sua dieta agora</a>
			</div>
		</section>
	);
}

export default Hero;