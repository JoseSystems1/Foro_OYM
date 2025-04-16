// About.js - Componente que muestra información sobre el desarrollador
import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

function About() {
  return (
    <div className="about-container">
      <h1 className="about-title">Acerca del Foro Universidad OyM</h1>
      
      <div className="about-content">
        <section className="about-section">
          <h2>Desarrollador</h2>
          <div className="developer-info">
            <div className="info-item">
              <span className="info-label">Nombre:</span>
              <span className="info-value">José Eduardo Williams</span>
            </div>
            <div className="info-item">
              <span className="info-label">Matrícula:</span>
              <span className="info-value">23-EISN-2-048</span>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Sobre el Proyecto</h2>
          <p>
            Este foro universitario fue desarrollado para facilitar la comunicación 
            entre estudiantes y profesores de la Universidad OyM. Permite compartir 
            sugerencias, opiniones y experiencias relacionadas con la vida universitaria.
          </p>
        </section>

        <section className="about-section">
          <h2>Características</h2>
          <ul className="features-list">
            <li>Publicación de posts por categorías</li>
            <li>Sistema de comentarios con respuestas</li>
            <li>Diseño responsivo para todos los dispositivos</li>
            <li>Interfaz intuitiva y fácil de usar</li>
          </ul>
        </section>
      </div>

      <div className="back-link">
        <Link to="/">← Volver a la página principal</Link>
      </div>
    </div>
  );
}

export default About;