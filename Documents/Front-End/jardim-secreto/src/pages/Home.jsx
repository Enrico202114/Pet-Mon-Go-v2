import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Produtos from "../components/Produtos";
import Frase from "../components/Frase";
import Footer from "../components/Footer";


function Home() {
    return (
        <>
        <Navbar />
        <Hero />
        <Produtos />
        <Frase />
        <Footer />
        </>
    );
}

export default Home;