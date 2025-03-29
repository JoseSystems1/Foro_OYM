// Footer.js - Pie de página de nuestra aplicación
import React from 'react';
import './Footer.css'; // Archivo de estilos

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-info">
          <p>&copy; {currentYear} Foro Universidad OyM. Todos los derechos reservados.</p>
          <p className="developer-credit">Desarrollado por: José Eduardo Williams</p>
        </div>
        <div className="footer-links">
          <a href="#">Acerca de</a>
          <a href="#">Contacto</a>
          <a href="#">Política de Privacidad</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;