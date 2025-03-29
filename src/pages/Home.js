// Home.js - Página principal de nuestra aplicación
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PostList from '../components/PostList';
import './Home.css';

function Home({ posts }) {
  const [filter, setFilter] = useState('all');
  
  // Filtrar posts según la categoría seleccionada
  const filteredPosts = filter === 'all' 
    ? posts 
    : posts.filter(post => post.category === filter);
    
  // Obtener categorías únicas de los posts
  const categories = ['all', ...new Set(posts.map(post => post.category))];
  
  return (
    <div className="home-page">
      <div className="welcome-banner">
        <h1>Bienvenido al Foro de la Universidad OyM</h1>
        <p>Comparte tus opiniones, sugerencias y experiencias con la comunidad universitaria</p>
        <Link to="/new-post" className="create-post-btn">
          Crear nuevo post
        </Link>
      </div>
      
      <div className="filter-container">
        <span>Filtrar por: </span>
        {categories.map(category => (
          <button 
            key={category}
            className={`filter-btn ${filter === category ? 'active' : ''}`}
            onClick={() => setFilter(category)}
          >
            {category === 'all' ? 'Todos' : category}
          </button>
        ))}
      </div>
      
      <PostList posts={filteredPosts} />
    </div>
  );
}

export default Home;