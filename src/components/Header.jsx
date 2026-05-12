// faz com que o React guarde e update um valor dentro do componente
// quando o valor muda, o React redesenha o componente automaticamente
import { useState } from "react";
import "./Header.css";

// Define o componente "Header".
// Um componente é uma função que retorna JSX (tipo HTML code) para mostrar na tela.
// { scrolled } é uma "prop" — data passada do parent component.
// Quando scrolled é true, o header vai mudar (ex: mudar o fundo dps do scroll).
function Header({ scrolled }) {
  // useState(false) cria a variável "menuOpen", começa como false (menu fechado).
  // "setMenuOpen" chamamos para atualizar esse valor.
  // usado para abrir/fechar o menu hamburger no mobile.
  const [menuOpen, setMenuOpen] = useState(false);

  // Isto faz um smooth scroll para cada section.
  const scrollTo = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });

    // fecha o menu no mobile depois de clicar em um link.
    setMenuOpen(false);
  };

  // "return" retorna o JSX (HTML-like code) que vai ser mostrado na tela.
  return (
    // The className changes dynamically:
    //   - vai sempre ter "header"
    //   - adiciona "header--scrolled" quando scrolled é true
    <header className={`header${scrolled ? " header--scrolled" : ""}`}>
      <div className="header__inner container">
        <button
          className="header__brand"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
        >
          <img
            src="/assets/logo.svg"
            alt=""
            aria-hidden="true"
            className="header__logo"
          />
          <span className="header__name">COGNIPHARMA</span>
        </button>

        <nav className={`header__nav${menuOpen ? " header__nav--open" : ""}`}>
          <button onClick={() => scrollTo("hero")}>Home</button>
          <button onClick={() => scrollTo("speaker")}>Speaker</button>
          <button onClick={() => scrollTo("register")}>Register</button>
        </nav>

        <button
          className={`header__hamburger${menuOpen ? " header__hamburger--open" : ""}`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

export default Header;
