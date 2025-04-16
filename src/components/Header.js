
// Header.js - Componente de cabecera para todas las páginas
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">Foro Universidad OyM</Link>
        </div>
        <nav className="nav">
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/new-post">Nuevo Post</Link></li>
            <li><Link to="/about">Acerca de</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;