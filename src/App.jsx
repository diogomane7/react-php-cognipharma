import { useState, useEffect, use } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Speaker from "./components/Speaker.jsx";
import RegistrationForm from "./components/RegistrationForm.jsx";
import Footer from "./components/Footer.jsx";

// useState e useEffect para controlar o estado de scroll
// e atualizar o header
function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <Header scrolled={scrolled} />
      <main>
        <Hero />
        <Speaker />
        <RegistrationForm />
      </main>
      <Footer />
    </>
  );
}

export default App;
