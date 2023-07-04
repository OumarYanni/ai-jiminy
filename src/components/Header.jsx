import React from 'react';
import '../styles/Header.css';
import logo from './assets/ai-jiminy-logo.png';

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="logo" className="logo" />
      <nav>
        <button className="btn-signup">Inscription</button>
        <button className="btn-login">Connexion</button>
      </nav>
    </header>
  );
}

export default Header;
