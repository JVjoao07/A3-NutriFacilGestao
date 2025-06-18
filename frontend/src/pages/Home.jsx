import { useContext } from 'react'
import Header from './../components/Header'
import Footer from './../components/Footer'
import Hero from './../components/Hero'
import Sobre from './../components/Sobre'
import Contato from './../components/Contato'
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from "react-router-dom"; // Importação adicionada

function Home() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate(); // Hook para navegação

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