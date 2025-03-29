// Header.js - Cabecera de nuestra aplicación
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Archivo de estilos

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <h1>Foro Universidad OyM</h1>
          </Link>
        </div>
        <nav className="main-nav">
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/new-post">Nuevo Post</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;