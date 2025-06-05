import React from 'react';
import { Link } from "react-router-dom";


function Header() {
	return (
		<header>
			<nav aria-label="Menu principal">
				<Link to="/" aria-label="Ir para a tela inicial">
					<div className="logo" role="banner" style={{ cursor: 'pointer' }}>
						<svg
							className="logo-svg"
							viewBox="0 0 200 50"
							aria-label="NutriFácil Logo"
						>
							{/* Folha estilizada */}
							<path
								className="logo-leaf"
								d="M30 10 C40 5, 45 15, 40 25 C35 35, 25 35, 20 25 C15 15, 20 5, 30 10 Z"
								fill="#2ecc71"
							/>
							{/* Círculo do prato */}
							<circle
								className="logo-plate"
								cx="30"
								cy="25"
								r="15"
								fill="none"
								stroke="#2ecc71"
								strokeWidth="2"
							/>
							{/* Texto NutriFácil */}
							<text
								className="logo-text"
								x="55"
								y="30"
								fill="#2c3e50"
							>
								NutriFácil
							</text>
						</svg>
					</div>
				</Link>

				<ul className="menu" role="menubar">
					<li role="none">
						<a href="/" role="menuitem">Início</a>
					</li>
					<li role="none">
						<a href="/dieta" role="menuitem">Dieta</a>
					</li>
					<li role="none">
						<a href="#sobre" role="menuitem">Sobre</a>
					</li>
					<li role="none">
						<a href="#contato" role="menuitem">Contato</a>
					</li>
				</ul>
				<button
					className="menu-mobile"
					aria-label="Abrir menu"
					aria-expanded="false"
					aria-controls="menu"
				>
					☰
				</button>
			</nav>
		</header>
	);
}

export default Header;
