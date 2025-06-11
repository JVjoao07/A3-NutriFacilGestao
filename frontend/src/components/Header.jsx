import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";

function Header() {
	const navigate = useNavigate();
	const isLoggedIn = !!localStorage.getItem('accessToken'); // ou outro nome do seu token

	const handleLogout = () => {
		localStorage.removeItem('accessToken');
		navigate('/login'); // ou onde quiser redirecionar após logout
	};

	return (
		<header>
			<nav aria-label="Menu principal">
				<Link to="/" aria-label="Ir para a tela inicial">
					<div className="logo" role="banner" style={{ cursor: 'pointer' }}>
						<svg className="logo-svg" viewBox="0 0 200 50" aria-label="NutriFácil Logo">
							<path d="M30 10 C40 5, 45 15, 40 25 C35 35, 25 35, 20 25 C15 15, 20 5, 30 10 Z" fill="#2ecc71" />
							<circle cx="30" cy="25" r="15" fill="none" stroke="#2ecc71" strokeWidth="2" />
							<text x="55" y="30" fill="#2c3e50">NutriFácil</text>
						</svg>
					</div>
				</Link>

				<ul className="menu" role="menubar">
					<li role="none"><a href="/" role="menuitem">Início</a></li>
					<li role="none"><a href="/dieta" role="menuitem">Dieta</a></li>
					<li role="none"><a href="#sobre" role="menuitem">Sobre</a></li>
					<li role="none"><a href="#contato" role="menuitem">Contato</a></li>
					{isLoggedIn && (
						<li role="none">
							<button className='sairBtn' onClick={handleLogout} role="menuitem">
								Sair
							</button>
						</li>
					)}
				</ul>

				<button className="menu-mobile" aria-label="Abrir menu" aria-expanded="false" aria-controls="menu">☰</button>
			</nav>
		</header>
	);
}

export default Header;
