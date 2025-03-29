// PostList.js - Componente que muestra la lista de posts
import React from 'react';
import { Link } from 'react-router-dom';
import './PostList.css';

function PostList({ posts }) {
  return (
    <div className="post-list">
      <h2>Publicaciones Recientes</h2>
      
      {posts.length === 0 ? (
        <p>No hay publicaciones disponibles.</p>
      ) : (
        posts.map(post => (
          <div className="post-card" key={post.id}>
            <div className="post-category">{post.category}</div>
            <h3 className="post-title">
              <Link to={`/post/${post.id}`}>{post.title}</Link>
            </h3>
            <p className="post-excerpt">
              {post.content.length > 150 
                ? post.content.substring(0, 150) + '...' 
                : post.content}
            </p>
            <div className="post-meta">
              <span>Por: {post.author}</span>
              <span>Fecha: {post.date}</span>
              <span>Comentarios: {post.comments.length}</span>
            </div>
            <Link to={`/post/${post.id}`} className="read-more">
              Leer más
            </Link>
          </div>
        ))
      )}
    </div>
  );
}

export default PostList;