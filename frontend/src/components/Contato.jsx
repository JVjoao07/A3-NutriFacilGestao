import React from 'react';

function Contato() {
	return (
		<section id="contato" className="contato" aria-label="Contato">
			<div className="container">
				<h2>Entre em Contato</h2>
				<div className="contato-content">
					<div className="contato-image">
						<img
							src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800&auto=format&fit=crop&q=60"
							alt="Nutricionista atendendo cliente"
							className="contato-img"
						/>
					</div>
					<form className="contato-form" aria-label="Formulário de contato">
						<div className="form-group">
							<label htmlFor="nome">Nome:</label>
							<input type="text" id="nome" name="nome" required />
						</div>
						<div className="form-group">
							<label htmlFor="email">E-mail:</label>
							<input type="email" id="email" name="email" required />
						</div>
						<div className="form-group">
							<label htmlFor="mensagem">Mensagem:</label>
							<textarea id="mensagem" name="mensagem" required></textarea>
						</div>
						<button type="submit" className="btn">Enviar Mensagem</button>
					</form>
				</div>
			</div>
		</section>
	);
}

export default Contato;
