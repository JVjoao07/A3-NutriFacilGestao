import { useContext, useState } from 'react'
import Header from './../components/Header'
import Footer from './../components/Footer'
import Hero from './../components/Hero'
import Sobre from './../components/Sobre'
import Contato from './../components/Contato'
import { AuthContext } from '../contexts/AuthContext';

function Home() {

	const { user, logout } = useContext(AuthContext);

	return (
		<>
			<Header />
			<Hero />
			<Sobre />
			<Contato />
			<Footer />
		</>
	)
}

export default Home
